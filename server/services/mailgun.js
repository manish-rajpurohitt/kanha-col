
const template = require('../config/template');
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_FROM_MAIL,
    pass: process.env.GMAIL_PASS,
  },
});

exports.sendEmail = async (email, type, host, data) => {
  try {
    const message = prepareTemplate(type, host, data);
    console.log(message)


    const mailOptions = {
      from: process.env.GMAIL_FROM_MAIL, // Sender's email address
      to: email, // Recipient's email address
      subject: message.subject, // Email subject
      html: message.text
    };

    let ree = await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error occurred:', error.message);
      }
      console.log('Email sent:', info.response);
    });
    console.log(ree, mailOptions);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const prepareTemplate = (type, host, data) => {
  let message;

  switch (type) {
    case 'reset':
      message = template.resetEmail(host, data);
      break;

    case 'reset-confirmation':
      message = template.confirmResetPasswordEmail();
      break;

    case 'signup':
      message = template.signupEmail(data);
      break;

    case 'merchant-signup':
      message = template.merchantSignup(host, data);
      break;

    case 'merchant-welcome':
      message = template.merchantWelcome(data);
      break;

    case 'newsletter-subscription':
      message = template.newsletterSubscriptionEmail();
      break;

    case 'contact':
      message = template.contactEmail();
      break;

    case 'merchant-application':
      message = template.merchantApplicationEmail();
      break;

    case 'merchant-deactivate-account':
      message = template.merchantDeactivateAccount();
      break;

    case 'order-information':
      message = template.orderInformationEmail(host, data);
      break;

    case 'order-confirmation':
      message = template.orderConfirmationEmail(data);
      break;

    case 'label-generation':
      message = template.generateShippingLabel(data);
    default:
      message = '';
  }

  return message;
};
