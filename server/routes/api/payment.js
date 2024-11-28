const express = require('express');
const Order = require('../../models/order');
const { ORDER_STATUS } = require('../../constants');
const payment = require('../../models/payment');
const { ObjectId } = require('mongoose');
const mailgun = require('../../services/mailgun');
const auth = require('../../middleware/auth');
const axios = require("axios");

const router = express.Router();

router.post('/create-order', auth, async (req, res) => {
    try {
        const { orderId } = req.body;

        let order = await Order.findOne({ _id: orderId }).populate({
            path: 'cart',
            populate: {
                path: 'products.product',
                populate: {
                    path: 'brand'
                }
            }
        }).populate('address');


        const productDetails = order.cart.products.map((product) => ({
            product_id: product._id,
            product_name: product.name,
            product_quantity: product.quantity,
            product_price: product.totalPrice,
        }));

        const date = new Date();
        date.setDate(date.getDate() + 2);
        const utcString = date.toISOString();

        const data = {
            order_id: orderId,
            order_amount: order.total,
            order_currency: "INR",
            customer_details: {
                customer_email: order.user.email,
                customer_phone: order.address.phoneNumber,
                customer_name: order.address.fullName,
                customer_id: order.user._id
            },
            order_meta: {
                return_url: process.env.CASHFREE_RETURN_URL + "?orderId=" + orderId, //process.env.CLIENT_URL + "/order/" + orderId,
                notify_url: process.env.PAYMENT_WEBHOOK_URL
            },
            order_expiry_time: utcString,
            product_details: productDetails, // Optional field for product info
        };



        const headers = {
            "content-type": "application/json",
            "x-client-id": process.env.CASHFREE_APP_ID,
            "x-client-secret": process.env.CASHFREE_SECRET_KEY,
            "x-api-version": "2022-09-01"
        };



        const response = await axios.post(`${process.env.CASHFREE_URL}/orders`, data, {
            headers,
        });

        await Order.updateOne({ _id: order._id }, {
            status: ORDER_STATUS.Payment_Initiated,
            paymentSessionId: response.data.payment_session_id,
            cashfreeId: response.data.cf_order_id
        });

        return res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: error
        });
    }
});

router.post('/payment-verify-webhook', async (req, res) => {
    try {
        // Step 1: Extract signature from headers
        const signature = req.headers["x-webhook-signature"];
        if (!signature) {
            console.error("Signature missing in headers.");
            return res.status(400).send("Invalid request");
        }

        // Step 2: Compute the HMAC-SHA256 hash of the payload using the secret key
        const payload = JSON.stringify(req.body);
        const computedSignature = crypto
            .createHmac("sha256", process.env.CASHFREE_WEBHOOK_SECRET_KEY)
            .update(payload)
            .digest("base64");

        // Step 3: Validate the signature
        if (signature !== computedSignature) {
            console.error("Signature mismatch.");
            return res.status(400).send("Invalid signature");
        }

        // Step 4: Validate required fields in payload
        const { order_id, order_status, payment_amount } = req.body;
        if (!order_id || !order_status || !payment_amount) {
            console.error("Invalid payload format.");
            return res.status(400).send("Invalid payload");
        }

        // Step 5: Process the webhook
        console.log("Valid webhook received:", req.body);

        let order = await Order.findOne({ _id: new ObjectId(order_id) });

        if (!order) {
            console.error("Invalid order id.");
            return res.status(400).send("Invalid order id");
        }
        if (order_status === "PAYMENT_SUCCESS") {
            await Order.updateOneById(order_id, {
                status: ORDER_STATUS.Payment_Success
            });

            await payment.updateOne({ order: new ObjectId(order_id) }, {
                paymentStatus: ORDER_STATUS.Payment_Success,
                paymentResponse: JSON.stringify(req.body),
                total: req.body.payment_amount,
                order: order_id,
                user: order.user
            })
            console.log(`Order ${order_id} has been paid successfully.`);
        } else if (order_status === "PAYMENT_FAILED") {
            if (order.paymentRetryCount === 3) {
                await Order.updateOneById(order_id, {
                    status: ORDER_STATUS.Cancelled,
                    cancelReason: "Payment Retry Limit Exceed",
                    paymentRetryCount: order.paymentRetryCount + 1
                });
            } else {
                await Order.updateOneById(order_id, {
                    status: ORDER_STATUS.Payment_Failed,
                    paymentRetryCount: order.paymentRetryCount + 1
                });
            }
            await payment.updateOne({ order: new ObjectId(order_id) }, {
                paymentStatus: ORDER_STATUS.Payment_Failed,
                paymentResponse: JSON.stringify(req.body),
                total: req.body.payment_amount,
                order: order_id,
                user: order.user
            });

            console.log(`Order ${order_id} payment failed.`);
        }

        res.status(200).send("Webhook processed");
    } catch (error) {
        console.error("Error processing webhook:", error.message);
        res.status(500).send("Internal server error");
    }
});

router.get('/return', async (req, res) => {
    try {
        let { orderId } = req.query;

        const headers = {
            "content-type": "application/json",
            "x-client-id": process.env.CASHFREE_APP_ID,
            "x-client-secret": process.env.CASHFREE_SECRET_KEY,
            "x-api-version": "2022-09-01"
        };

        const response = await axios.get(`${process.env.CASHFREE_URL}/orders/${orderId}`, {
            headers,
        });


        let order = await Order.findOne({ _id: orderId }).populate('user').populate('address');

        if (order.status !== ORDER_STATUS.Payment_Initiated) {
            return res.status(400).json({
                error: "Invalid order"
            })
        }

        await payment.updateOne({ order: orderId }, {
            returnResponse: JSON.stringify(response.data),
            paymentStatus: response.data.order_status
        });

        if (response.data.order_status === "PAID") {
            await Order.updateOne({ _id: orderId }, {
                status: ORDER_STATUS.Payment_Success,
            });
            await mailgun.sendEmail(order.user.email, 'order-confirmation', process.env.CLIENT_URL, order);
            await mailgun.sendEmail("kanhacollections66@gmail.com", 'label-generation', process.env.CLIENT_URL, {
                fullName: order.address.fullName,
                address: order.address.address,
                city: order.address.city,
                state: order.address.state,
                zipCode: order.address.zipCode,
                phoneNumber: order.address.phoneNumber,
                orderId: order._id
            });
        } else {
            await Order.updateOne({ _id: orderId }, {
                status: order.paymentRetryCount >= 3 ? ORDER_STATUS.Cancelled : ORDER_STATUS.Payment_Initiated,
                paymentRetryCount: order.paymentRetryCount + 1
            });
        }

        res.status(301).redirect(process.env.CLIENT_URL + "/order/" + orderId);
    } catch (error) {
        console.error("Error processing return url:", error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;