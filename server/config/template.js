exports.resetEmail = (host, resetToken) => {
  const message = {
    subject: 'Reset Password',
    text:
      `${'You are receiving this because you have requested to reset your password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://'
      }${host}/reset-password/${resetToken}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };

  return message;
};

exports.confirmResetPasswordEmail = () => {
  const message = {
    subject: 'Password Changed',
    text:
      `You are receiving this email because you changed your password. \n\n` +
      `If you did not request this change, please contact us immediately.`
  };

  return message;
};

exports.merchantSignup = (host, { resetToken, email }) => {
  const message = {
    subject: 'Merchant Registration',
    text: `${'Congratulations! Your application has been accepted. Please complete your Merchant account signup by clicking on the link below. \n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://'
      }${host}/merchant-signup/${resetToken}?email=${email}\n\n`
  };

  return message;
};

exports.merchantWelcome = name => {
  const message = {
    subject: 'Merchant Registration',
    text:
      `Hi ${name}! Congratulations! Your application for merchant account has been accepted. \n\n` +
      `It looks like you already have a member account with us. Please sign in with your member credentials and you will be able to see your merchant account.`
  };

  return message;
};

exports.signupEmail = name => {
  const message = {
    subject: 'Account Registration',
    text: `Hi ${name.firstName} ${name.lastName}! Thank you for creating an account with us!.`
  };

  return message;
};

exports.newsletterSubscriptionEmail = () => {
  const message = {
    subject: 'Newsletter Subscription',
    text:
      `You are receiving this email because you subscribed to our newsletter. \n\n` +
      `If you did not request this change, please contact us immediately.`
  };

  return message;
};

exports.contactEmail = () => {
  const message = {
    subject: 'Contact Us',
    text: `We received your message! Our team will contact you soon. \n\n`
  };

  return message;
};

exports.merchantApplicationEmail = () => {
  const message = {
    subject: 'Sell on Kanha Collections',
    text: `We received your request! Our team will contact you soon. \n\n`
  };

  return message;
};

exports.merchantDeactivateAccount = () => {
  const message = {
    subject: 'Merchant account on Kanha Collections',
    text:
      `Your merchant account has been disabled. \n\n` +
      `Please contact admin to request access again.`
  };

  return message;
};

exports.orderConfirmationEmail = order => {
  const message = {
    subject: `Payment Confirmation ${order._id}`,
    text:
      `Hi ${order.address.fullName}! Thank you for your payment!. \n\n` +
      `We've received your payment and will contact you as soon as your package is shipped. \n\n`
  };

  return message;
};

exports.orderInformationEmail = (host, order) => {
  console.log(order);
  const message = {
    subject: `Order Information - ${order._id}`,
    text:
      `Dear ${order.address.fullName},\n\n` +
      `Thank you for your order with us! We have received your order with the following details:\n\n` +
      `Order ID: ${order._id}\n` +
      `Items Ordered:\n` +
      order.products.map(item => `- ${item.product.name.length > 20 ? item.product.name.slice(0, 20) + "..." : item.product.name} (Quantity: ${item.quantity}, Price: ₹${item.totalPrice})`).join("\n") +
      `\n\nTotal Amount: ₹${order.total}\n\n` +
      `To proceed with shipping your order, we kindly request you to complete the payment. You can do so using the link below:\n\n` +
      `${host}/order/${order._id}\n\n` +
      `Link is valid only for 2 days. Order will be cancelled automatically if payment is not made.` +
      `Once we confirm the payment, we will initiate the shipping process and keep you updated.\n\n` +
      `If you have any questions or need assistance, please contact us at kanhacollections66+support@gmail.com or 8297997256.\n\n` +
      `Thank you for choosing us!\n\n` +
      `Best regards,\n` +
      `Kanha Collections`
  };

  return message;
};

exports.generateShippingLabel = (data) => {
  const message = {
    subject: `Shipping Label for Order - ${data.orderId}`,
    text: `<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Shipping Label</title><style>* {margin: 0; padding: 0; box-sizing: border-box;} body {font-family: Arial, sans-serif; background-color: #f7f7f7;} .shipping-label {width: 500px; padding: 20px; border: 2px solid #000; background-color: #fff; margin: 20px auto; font-size: 14px;} .label-header {display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;} .business-name {white-space: nowrap; font-size: 18px; font-weight: bold;} .tracking-number {font-size: 16px; font-weight: bold; white-space: nowrap;} .address-container {display: flex; justify-content: space-between; margin-bottom: 20px;} .sender, .recipient {width: 48%;} h3 {margin-bottom: 10px; font-size: 16px; font-weight: bold;} p {margin: 4px 0;} .barcode {text-align: center; margin-bottom: 20px;} .footer {text-align: center; font-size: 12px; color: #888;}</style></head><body><div class='shipping-label'><div class='label-header'><div class='business-name'>Kanha Collections</div><div class='tracking-number'><strong>Order Id:</strong><span id='tracking-number'>${data.orderId}</span></div></div><div class='address-container'><div class='sender'><h3>Sender Information</h3><p><strong>Company:</strong>Kanha Collections</p><p><strong>Address:</strong> Kamati Street, Chinna Bazar</p><p><strong>City:</strong> Nellore</p><p><strong>State:</strong> AP</p><p><strong>ZIP:</strong> 524001</p><p><strong>Phone:</strong> +91-8297997256</p></div><div class='recipient'><h3>Recipient Information</h3><p><strong>Name:</strong> ${data.fullName}</p><p><strong>Address:</strong> ${data.address}</p><p><strong>City:</strong> ${data.city}</p><p><strong>State:</strong> ${data.state}</p><p><strong>ZIP:</strong> ${data.zipCode}</p><p><strong>Phone:</strong> ${data.phoneNumber}</p></div></div><div class='barcode'><canvas id='barcode'></canvas></div><div class='footer'><p>&copy; 2024 Kanha Collections. All Rights Reserved.</p></div></div><script src='https://cdn.jsdelivr.net/npm/jsbarcode/dist/JsBarcode.all.min.js'></script><script>window.onload = function() {const trackingNumber = document.getElementById('tracking-number').textContent; JsBarcode('#barcode', ${data.orderId}, { format: 'CODE128', width: 2, height: 50, displayValue: true, fontSize: 12 });};</script></body></html>`
  };

  return message;
};