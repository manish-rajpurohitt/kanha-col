exports.welcomeMessage = (data) => {
    const message = {
        subject: `Welcome ${data.username} | Kanha Collections`,
        text: `<!DOCTYPE html><html><head>    <style>        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; }        .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; }        .header { text-align: center; margin-bottom: 20px; }        .header img { max-width: 120px; }        .content { color: #333333; text-align: center; line-height: 1.6; }        .content h1 { font-size: 20px; margin-bottom: 10px; }        .content p { margin: 10px 0; }        .button { display: inline-block; margin: 20px 0; background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px; }        .footer { margin-top: 30px; text-align: center; color: #777777; font-size: 14px; }        .footer p { margin: 5px 0; }        .social-links { margin-top: 10px; }        .social-links a { margin: 0 10px; text-decoration: none; color: #007bff; font-size: 16px; }        .social-links img { width: 24px; height: 24px; vertical-align: middle; }    </style></head><body>    <div class="email-container">        <div class="header">            <img src="https://your-logo-url.com/logo.png" alt="Business Logo">        </div>        <div class="content">            <h1>Welcome to Kanha Collections!</h1>            <p>Hi ${data.username},</p>            <p>We’re excited to have you on board. Your account has been successfully created, and you’re now part of the Kanha Collections family!</p>            <a href="https://kanhacollections.in/shop" class="button">Shop Now</a>            <p>Feel free to explore and let us know if you have any questions.</p>        </div>         <div class="footer">            <p>Follow us on:</p>            <div class="social-links">                <a href="https://facebook.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" alt="Facebook"></a>                <a href="https://x.com/kanha-collections" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384065.png" alt="Twitter"></a>                <a href="https://instagram.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram"></a>            </div>            <p>© 2024 Kanha Collections. All Rights Reserved.</p>        </div>    </div></body></html>`
    }
    return message;
}


exports.forgotPassword = (data) => {
    const message = {
        subject: `Forgot Password | Kanha Collections`,
        text: `<!DOCTYPE html><html><head>    <style>        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; }        .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; }        .header { text-align: center; margin-bottom: 20px; }        .header img { max-width: 120px; }        .content { color: #333333; text-align: center; line-height: 1.6; }        .content h1 { font-size: 20px; margin-bottom: 10px; }        .content p { margin: 10px 0; }        .button { display: inline-block; margin: 20px 0; background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px; }        .footer { margin-top: 30px; text-align: center; color: #777777; font-size: 14px; }        .footer p { margin: 5px 0; }        .social-links { margin-top: 10px; }        .social-links a { margin: 0 10px; text-decoration: none; color: #007bff; font-size: 16px; }        .social-links img { width: 24px; height: 24px; vertical-align: middle; }    </style></head><body>    <div class="email-container">        <div class="header">            <img src="https://your-logo-url.com/logo.png" alt="Business Logo">        </div>        <div class="content">            <h1>Reset Your Password</h1>            <p>Hi ${data.username},</p>            <p>You requested to reset your password. Click the button below to reset it:</p>            <a href="${data.link}" class="button">Reset Password</a>            <p>If you did not request this, please ignore this email.</p>        </div>         <div class="footer">            <p>Follow us on:</p>            <div class="social-links">                <a href="https://facebook.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" alt="Facebook"></a>                <a href="https://x.com/kanha-collections" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384065.png" alt="Twitter"></a>                <a href="https://instagram.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram"></a>            </div>            <p>© 2024 Kanha Collections. All Rights Reserved.</p>        </div>    </div></body></html>`
    }
    return message;
}


exports.passwordResetSuccess = (data) => {
    const message = {
        subject: `Password Changed | Kanha Collections`,
        text: `<!DOCTYPE html><html><head>    <style>        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; }        .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; }        .header { text-align: center; margin-bottom: 20px; }        .header img { max-width: 120px; }        .content { color: #333333; text-align: center; line-height: 1.6; }        .content h1 { font-size: 20px; margin-bottom: 10px; }        .content p { margin: 10px 0; }        .button { display: inline-block; margin: 20px 0; background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px; }        .footer { margin-top: 30px; text-align: center; color: #777777; font-size: 14px; }        .footer p { margin: 5px 0; }        .social-links { margin-top: 10px; }        .social-links a { margin: 0 10px; text-decoration: none; color: #007bff; font-size: 16px; }        .social-links img { width: 24px; height: 24px; vertical-align: middle; }    </style></head><body>    <div class="email-container">        <div class="header">            <img src="https://your-logo-url.com/logo.png" alt="Business Logo">        </div>        <div class="content">            <h1>Password Changed Successfully</h1>            <p>Hi ${data.username},</p>            <p>Your password has been successfully changed. If you did not make this change, please contact us immediately.</p>        </div>         <div class="footer">            <p>Follow us on:</p>            <div class="social-links">                <a href="https://facebook.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" alt="Facebook"></a>                <a href="https://x.com/kanha-collections" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384065.png" alt="Twitter"></a>                <a href="https://instagram.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram"></a>            </div>            <p>© 2024 Kanha Collections. All Rights Reserved.</p>        </div>    </div></body></html>`
    }
    return message;
}


exports.orderPlaced = (data) => {
    const message = {
        subject: `Order has been Placed - ${data.orderid} | Kanha Collections`,
        text: `<!DOCTYPE html><html><head>    <style>        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; }        .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; }        .header { text-align: center; margin-bottom: 20px; }        .header img { max-width: 120px; }        .content { color: #333333; text-align: center; line-height: 1.6; }        .content h1 { font-size: 20px; margin-bottom: 10px; }        .content p { margin: 10px 0; }        .button { display: inline-block; margin: 20px 0; background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px; }        .footer { margin-top: 30px; text-align: center; color: #777777; font-size: 14px; }        .footer p { margin: 5px 0; }        .social-links { margin-top: 10px; }        .social-links a { margin: 0 10px; text-decoration: none; color: #007bff; font-size: 16px; }        .social-links img { width: 24px; height: 24px; vertical-align: middle; }    </style></head><body>    <div class="email-container">        <div class="header">            <img src="https://your-logo-url.com/logo.png" alt="Business Logo">        </div>        <div class="content">            <h1>Your Order Has Been Placed!</h1>            <p>Hi ${data.username},</p>            <p>Thank you for shopping with us! Your order #${data.orderid} has been successfully placed.</p>            <p>We’ll notify you once it’s shipped. In the meantime, you can review your order details in your account.</p>            <a href="https://kanhacollections.in/order/${data.orderid}" class="button">View Order Details</a>        </div>         <div class="footer">            <p>Follow us on:</p>            <div class="social-links">                <a href="https://facebook.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" alt="Facebook"></a>                <a href="https://x.com/kanha-collections" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384065.png" alt="Twitter"></a>                <a href="https://instagram.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram"></a>            </div>            <p>© 2024 Kanha Collections. All Rights Reserved.</p>        </div>    </div></body></html>`
    }
    return message;
}


exports.orderConfirmed = (data) => {
    const message = {
        subject: `Order Confirmed - ${data.orderid} | Kanha Collections`,
        text: `<!DOCTYPE html><html><head>    <style>        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; }        .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; }        .header { text-align: center; margin-bottom: 20px; }        .header img { max-width: 120px; }        .content { color: #333333; text-align: center; line-height: 1.6; }        .content h1 { font-size: 20px; margin-bottom: 10px; }        .content p { margin: 10px 0; }        .button { display: inline-block; margin: 20px 0; background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px; }        .footer { margin-top: 30px; text-align: center; color: #777777; font-size: 14px; }        .footer p { margin: 5px 0; }        .social-links { margin-top: 10px; }        .social-links a { margin: 0 10px; text-decoration: none; color: #007bff; font-size: 16px; }        .social-links img { width: 24px; height: 24px; vertical-align: middle; }    </style></head><body>    <div class="email-container">        <div class="header">            <img src="https://your-logo-url.com/logo.png" alt="Business Logo">        </div>        <div class="content">            <h1>Payment Successful!</h1>            <p>Hi ${data.username},</p>            <p>We have successfully received your payment for order #${data.orderid}. Thank you for your purchase!</p>            <p>You can track your order status below:</p>            <a href="https://kanhacollections.in/order/${data.orderid}" class="button">Track My Order</a>        </div>         <div class="footer">            <p>Follow us on:</p>            <div class="social-links">                <a href="https://facebook.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" alt="Facebook"></a>                <a href="https://x.com/kanha-collections" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384065.png" alt="Twitter"></a>                <a href="https://instagram.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram"></a>            </div>            <p>© 2024 Kanha Collections. All Rights Reserved.</p>        </div>    </div></body></html>`
    }
    return message;
}


exports.orderShipped = (data) => {
    const message = {
        subject: `Order has been shipped - ${data.orderid} | Kanha Collections`,
        text: `<!DOCTYPE html><html><head>    <style>        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; }        .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; }        .header { text-align: center; margin-bottom: 20px; }        .header img { max-width: 120px; }        .content { color: #333333; text-align: center; line-height: 1.6; }        .content h1 { font-size: 20px; margin-bottom: 10px; }        .content p { margin: 10px 0; }        .button { display: inline-block; margin: 20px 0; background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px; }        .footer { margin-top: 30px; text-align: center; color: #777777; font-size: 14px; }        .footer p { margin: 5px 0; }        .social-links { margin-top: 10px; }        .social-links a { margin: 0 10px; text-decoration: none; color: #007bff; font-size: 16px; }        .social-links img { width: 24px; height: 24px; vertical-align: middle; }    </style></head><body>    <div class="email-container">        <div class="header">            <img src="https://your-logo-url.com/logo.png" alt="Business Logo">        </div>        <div class="content">            <h1>Your Order Was Shipped!</h1>            <p>Dear ${data.username},</p>            <p>We know you can't wait for your package to arrive. That is why you can track your order here:</p>            <a href="https://kanhacollections/order/${data.orderid}" class="button">Track Package</a>            <p>Please note, it could take some time for the tracking information to show on the above.</p>        </div>         <div class="footer">            <p>Follow us on:</p>            <div class="social-links">                <a href="https://facebook.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" alt="Facebook"></a>                <a href="https://x.com/kanha-collections" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384065.png" alt="Twitter"></a>                <a href="https://instagram.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram"></a>            </div>            <p>© 2024 Kanha Collections. All Rights Reserved.</p>        </div>    </div></body></html>`
    }
    return message;
}


exports.orderCancelled = (data) => {
    const message = {
        subject: `Order Cancelled - ${data.orderid} | Kanha Collections`,
        text: `<!DOCTYPE html><html><head>    <style>        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; }        .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; }        .header { text-align: center; margin-bottom: 20px; }        .header img { max-width: 120px; }        .content { color: #333333; text-align: center; line-height: 1.6; }        .content h1 { font-size: 20px; margin-bottom: 10px; }        .content p { margin: 10px 0; }        .button { display: inline-block; margin: 20px 0; background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px; }        .footer { margin-top: 30px; text-align: center; color: #777777; font-size: 14px; }        .footer p { margin: 5px 0; }        .social-links { margin-top: 10px; }        .social-links a { margin: 0 10px; text-decoration: none; color: #007bff; font-size: 16px; }        .social-links img { width: 24px; height: 24px; vertical-align: middle; }    </style></head><body>    <div class="email-container">        <div class="header">            <img src="https://your-logo-url.com/logo.png" alt="Business Logo">        </div>        <div class="content">            <h1>Your Order Has Been Cancelled</h1>            <p>Dear ${data.username},</p>            <p>We are sorry to inform you that your order <strong>#${data.orderid}</strong> has been cancelled. If you have any questions or need assistance, please do not hesitate to contact us.</p>            <a href="https://kanhacollections/contact" class="button">Contact Support</a>            <p>If you need further details, feel free to reach out to us at any time.</p>        </div>         <div class="footer">            <p>Follow us on:</p>            <div class="social-links">                <a href="https://facebook.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" alt="Facebook"></a>                <a href="https://x.com/kanha-collections" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384065.png" alt="Twitter"></a>                <a href="https://instagram.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram"></a>            </div>            <p>© 2024 Kanha Collections. All Rights Reserved.</p>        </div>    </div></body></html>`
    }
    return message;
}

exports.orderDelivered = (data) => {
    const message = {
        subject: `Order Delivered - ${data.orderid} | Kanha Collections`,
        text: `<!DOCTYPE html><html><head>    <style>        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; }        .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; }        .header { text-align: center; margin-bottom: 20px; }        .header img { max-width: 120px; }        .content { color: #333333; text-align: center; line-height: 1.6; }        .content h1 { font-size: 20px; margin-bottom: 10px; }        .content p { margin: 10px 0; }        .button { display: inline-block; margin: 20px 0; background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px; }        .footer { margin-top: 30px; text-align: center; color: #777777; font-size: 14px; }        .footer p { margin: 5px 0; }        .social-links { margin-top: 10px; }        .social-links a { margin: 0 10px; text-decoration: none; color: #007bff; font-size: 16px; }        .social-links img { width: 24px; height: 24px; vertical-align: middle; }    </style></head><body>    <div class="email-container">        <div class="header">            <img src="https://your-logo-url.com/logo.png" alt="Business Logo">        </div>        <div class="content">            <h1>Your Order Has Been Delivered!</h1>            <p>Hi ${data.username},</p>            <p>We’re thrilled to let you know that your order #${data.orderid} has been successfully delivered.</p>            <p>We hope you love it! Let us know your thoughts by leaving a review.</p>            <a href="https://kanhacollections/order/${data.orderid}" class="button">Leave a Review</a>        </div>         <div class="footer">            <p>Follow us on:</p>            <div class="social-links">                <a href="https://facebook.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" alt="Facebook"></a>                <a href="https://x.com/kanha-collections" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384065.png" alt="Twitter"></a>                <a href="https://instagram.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram"></a>            </div>            <p>© 2024 Kanha Collections. All Rights Reserved.</p>        </div>    </div></body></html>`
    }
    return message;
}

exports.contactUsResponse = (data) => {
    const message = {
      subject: 'Contact Us | Kanha Collections',
      text: `<!DOCTYPE html><html><head>    <style>        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; }        .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; }        .header { text-align: center; margin-bottom: 20px; }        .header img { max-width: 120px; }        .content { color: #333333; text-align: center; line-height: 1.6; }        .content h1 { font-size: 20px; margin-bottom: 10px; }        .content p { margin: 10px 0; }        .button { display: inline-block; margin: 20px 0; background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px; }        .footer { margin-top: 30px; text-align: center; color: #777777; font-size: 14px; }        .footer p { margin: 5px 0; }        .social-links { margin-top: 10px; }        .social-links a { margin: 0 10px; text-decoration: none; color: #007bff; font-size: 16px; }        .social-links img { width: 24px; height: 24px; vertical-align: middle; }    </style></head><body>    <div class="email-container">        <div class="header">            <img src="https://your-logo-url.com/logo.png" alt="Business Logo">        </div>        <div class="content">            <h1>We Received Your Message!</h1>            <p>Hi ${data.username},</p>            <p>We have received your message! Our team will contact you soon.</p>        </div>         <div class="footer">            <p>Follow us on:</p>            <div class="social-links">                <a href="https://facebook.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" alt="Facebook"></a>                <a href="https://x.com/kanha-collections" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384065.png" alt="Twitter"></a>                <a href="https://instagram.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram"></a>            </div>            <p>© 2024 Kanha Collections. All Rights Reserved.</p>        </div>    </div></body></html>`
    };
  
    return message;
};

exports.sendShippingLabel = (data) => {
    const message = {
      subject: `Shipping Label - ${data.orderid} | Kanha Collections`,
      text: `<!DOCTYPE html><html><head>    <style>        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; }        .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; }        .header { text-align: center; margin-bottom: 20px; }        .header img { max-width: 120px; }        .content { color: #333333; text-align: center; line-height: 1.6; }        .content h1 { font-size: 20px; margin-bottom: 10px; }        .content p { margin: 10px 0; }        .button { display: inline-block; margin: 20px 0; background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px; }        .footer { margin-top: 30px; text-align: center; color: #777777; font-size: 14px; }        .footer p { margin: 5px 0; }        .social-links { margin-top: 10px; }        .social-links a { margin: 0 10px; text-decoration: none; color: #007bff; font-size: 16px; }        .social-links img { width: 24px; height: 24px; vertical-align: middle; }    </style></head><body>    <div class="email-container">        <div class="header">            <img src="https://your-logo-url.com/logo.png" alt="Business Logo">        </div>        <div class="content">            <h1>We Received Your Message!</h1>            <p>Hi Kanha Collections,</p>            <p>We have received an order, Please find attached shipping label.</p>        </div>         <div class="footer">            <p>Follow us on:</p>            <div class="social-links">                <a href="https://facebook.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" alt="Facebook"></a>                <a href="https://x.com/kanha-collections" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384065.png" alt="Twitter"></a>                <a href="https://instagram.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram"></a>            </div>            <p>© 2024 Kanha Collections. All Rights Reserved.</p>        </div>    </div></body></html>`,
      path: data.labelpath
    };
  
    return message;
};

exports.paymentFailed = (data) => {
    const message = {
      subject: `Payment Failed - ${data.orderid} | Kanha Collections`,
      text: `<!DOCTYPE html><html><head>    <style>        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; }        .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; }        .header { text-align: center; margin-bottom: 20px; }        .header img { max-width: 120px; }        .content { color: #333333; text-align: center; line-height: 1.6; }        .content h1 { font-size: 20px; margin-bottom: 10px; }        .content p { margin: 10px 0; }        .button { display: inline-block; margin: 20px 0; background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px; }        .footer { margin-top: 30px; text-align: center; color: #777777; font-size: 14px; }        .footer p { margin: 5px 0; }        .social-links { margin-top: 10px; }        .social-links a { margin: 0 10px; text-decoration: none; color: #007bff; font-size: 16px; }        .social-links img { width: 24px; height: 24px; vertical-align: middle; }    </style></head><body>    <div class="email-container">        <div class="header">            <img src="https://your-logo-url.com/logo.png" alt="Business Logo">        </div>        <div class="content">             <h1>Payment Failed</h1>            <p>Hi ${data.username},</p>            <p>Unfortunately, your payment for order #${data.orderid} could not be processed.</p>            <p>Please try again or contact us for assistance.</p>            <a href="https://kanhacollections.in/order/${data.orderid}" class="button">Retry Payment</a>        </div>         <div class="footer">            <p>Follow us on:</p>            <div class="social-links">                <a href="https://facebook.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" alt="Facebook"></a>                <a href="https://x.com/kanha-collections" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384065.png" alt="Twitter"></a>                <a href="https://instagram.com/kanhacollections66" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram"></a>            </div>            <p>© 2024 Kanha Collections. All Rights Reserved.</p>        </div>    </div></body></html>`
    };
  
    return message;
};
