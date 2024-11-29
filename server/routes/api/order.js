const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');

// Bring in Models & Utils
const Order = require('../../models/order');
const User = require('../../models/user');
const Address = require('../../models/address');
const Cart = require('../../models/cart');
const Product = require('../../models/product');
const auth = require('../../middleware/auth');
const mailgun = require('../../services/mailgun');
const store = require('../../utils/store');
const { ROLES, CART_ITEM_STATUS, ORDER_STATUS, EMAIL_TEMPLATES } = require('../../constants');
const role = require('../../middleware/role');

router.post('/add', auth, async (req, res) => {
  try {
    const cart = req.body.cartId;
    const total = req.body.total;
    const address = req.body.addressId;
    const user = req.user._id;

    const order = new Order({
      cart,
      user,
      address,
      total,
      status: ORDER_STATUS.Payment_Initiated
    });

    const orderDoc = await order.save();

    const cartDoc = await Cart.findById(orderDoc.cart._id).populate({
      path: 'products.product',
      populate: {
        path: 'brand'
      }
    });

    const newOrder = {
      _id: orderDoc._id,
      created: orderDoc.created,
      user: orderDoc.user,
      total: orderDoc.total,
      products: cartDoc.products,
      address: orderDoc.address
    };

    let userDoc = await User.findOne({_id: user});
    let addressDoc = await Address.findOne({_id: address});

    await mailgun.sendEmail(userDoc.email, EMAIL_TEMPLATES.ORDER_PLACED, {username: addressDoc.fullName, orderid: orderDoc._id});

    res.status(200).json({
      success: true,
      message: `Your order has been placed successfully!`,
      order: { _id: orderDoc._id }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// search orders api
router.get('/search', auth, async (req, res) => {
  try {
    const { search } = req.query;

    if (!Mongoose.Types.ObjectId.isValid(search)) {
      return res.status(200).json({
        orders: []
      });
    }

    let ordersDoc = null;

    if (req.user.role === ROLES.Admin) {
      ordersDoc = await Order.find({
        _id: Mongoose.Types.ObjectId(search)
      }).populate({
        path: 'cart',
        populate: {
          path: 'products.product',
          populate: {
            path: 'brand'
          }
        }
      });
    } else {
      const user = req.user._id;
      ordersDoc = await Order.find({
        _id: Mongoose.Types.ObjectId(search),
        user
      }).populate({
        path: 'cart',
        populate: {
          path: 'products.product',
          populate: {
            path: 'brand'
          }
        }
      });
    }

    ordersDoc = ordersDoc.filter(order => order.cart);

    if (ordersDoc.length > 0) {
      const newOrders = ordersDoc.map(o => {
        return {
          _id: o._id,
          total: parseFloat(Number(o.total.toFixed(2))),
          created: o.created,
          products: o.cart?.products
        };
      });

      let orders = newOrders.map(o => store.caculateTaxAmount(o));
      orders.sort((a, b) => b.created - a.created);
      res.status(200).json({
        orders
      });
    } else {
      res.status(200).json({
        orders: []
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch orders api
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const ordersDoc = await Order.find()
      .sort('-created')
      .populate({
        path: 'cart',
        populate: {
          path: 'products.product',
          populate: {
            path: 'brand'
          }
        }
      })
      .populate('address')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Order.countDocuments();
    const orders = store.formatOrders(ordersDoc);

    res.status(200).json({
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      count
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch my orders api
router.get('/me', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const user = req.user._id;
    const query = { user };

    const ordersDoc = await Order.find(query)
      .sort('-created')
      .populate({
        path: 'cart',
        populate: {
          path: 'products.product',
          populate: {
            path: 'brand'
          }
        }
      }).populate('address')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Order.countDocuments(query);
    const orders = store.formatOrders(ordersDoc);

    res.status(200).json({
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      count
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch order api
router.get('/:orderId', auth, async (req, res) => {
  try {
    const orderId = req.params.orderId;

    let orderDoc = null;

    if (req.user.role === ROLES.Admin) {
      orderDoc = await Order.findOne({ _id: orderId }).populate({
        path: 'cart',
        populate: {
          path: 'products.product',
          populate: {
            path: 'brand'
          }
        }
      }).populate('address');
    } else {
      try {
        const user = req.user._id;
        orderDoc = await Order.findOne({ _id: orderId, user }).populate({
          path: 'cart',
          populate: {
            path: 'products.product',
            populate: {
              path: 'brand'
            }
          }
        }).populate('address')
      }
      catch (er) { console.log(er); }
    }

    if (!orderDoc || !orderDoc.cart) {
      return res.status(404).json({
        message: `Cannot find order with the id: ${orderId}.`
      });
    }

    let order = {
      _id: orderDoc._id,
      total: orderDoc.total,
      created: orderDoc.created,
      totalTax: 0,
      products: orderDoc?.cart?.products,
      cartId: orderDoc.cart._id,
      address: orderDoc.address,
      status: orderDoc?.status,
      sessId: orderDoc?.paymentSessionId,
      shipping: orderDoc.shipping
    };

    order = store.caculateTaxAmount(order);

    res.status(200).json({
      order
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete('/cancel/:orderId', auth, async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findOne({ _id: orderId });
    const foundCart = await Cart.findOne({ _id: order.cart });

    increaseQuantity(foundCart.products);

    await Order.deleteOne({ _id: orderId });
    await Cart.deleteOne({ _id: order.cart });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/addShipping/:orderId', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findOne({ _id: orderId });
    if(!order) return res.status(400).json({
      success: false,
      message: "Order not found"
    });

    let reee = await Order.updateOne({_id: orderId}, {
      shipping:{
        track: req.body.track,
        provider: req.body.provider
      }
    });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/status/:orderId', auth, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    if(!orderId){
      orderId = req.body.orderId
    }
    const cartId = req.body.cartId;
    const status = req.body.status || CART_ITEM_STATUS.Cancelled;

    const orderDoc = await Order.findOne({_id: orderId}).populate('cart').populate('address').populate('user');
    const foundCart = await Cart.findOne({ _id: orderDoc.cart._id }).populate({
      path: 'products.product',
      populate: {
        path: 'brand'
      }
    });

    if (status === CART_ITEM_STATUS.Cancelled) {

      await foundCart.products.map(async (pro)=>{
        await Product.updateOne(
          { _id: pro.product._id },
          { $inc: { quantity: pro.quantity } }
        );
      })
      
      await Order.updateOne({ _id: orderId }, {status: CART_ITEM_STATUS.Cancelled});

      await mailgun.sendEmail(orderDoc.user.email, EMAIL_TEMPLATES.ORDER_CANCELLED, {username: orderDoc.address.fullName});

      return res.status(200).json({
        success: true,
        orderCancelled: true,
        message: `${req.user.role === ROLES.Admin ? 'Order' : 'Your order'
          } has been cancelled successfully`
      });
    }else{
      await Order.updateOne({ _id: orderId }, {status: status});
    }

    switch(status){
      case (CART_ITEM_STATUS.Shipped):
        await mailgun.sendEmail(orderDoc.user.email, EMAIL_TEMPLATES.ORDER_SHIPPED, {username: orderDoc.address.fullName, orderid: orderDoc._id});
        break;
      case(CART_ITEM_STATUS.Delivered):
        await mailgun.sendEmail(orderDoc.user.email, EMAIL_TEMPLATES.ORDER_DELIVERED, {username: orderDoc.address.fullName, orderId: orderDoc._id});
        break;
      default:
        break;
    }

    res.status(200).json({
      success: true,
      message: 'Item status has been updated successfully!'
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

const increaseQuantity = products => {
  let bulkOptions = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: item.quantity } }
      }
    };
  });

  Product.bulkWrite(bulkOptions);
};

module.exports = router;
