
const template = require('../config/template');
const templates = require('../config/templates');
const nodemailer = require("nodemailer");
const { EMAIL_TEMPLATES } = require('../constants');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_FROM_MAIL,
    pass: process.env.GMAIL_PASS,
  },
});

exports.sendEmail = async (email, type, data) => {
  try {
    const message = prepareTemplates(type, data);

    const mailOptions = {
      from: process.env.GMAIL_FROM_MAIL, // Sender's email address
      to: email, // Recipient's email address
      subject: message.subject, // Email subject
      html: message.text,
      attachments: []
    };

    if(type === EMAIL_TEMPLATES.SEND_SHIPPING_LABEL){
      mailOptions.attachments.push({
        filename: data.orderid + "_" + data.username+".pdf",
        path: data.labelpath
      })
    }

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


const prepareTemplates = (type, data) => {
  let message;

  switch (type) {
    case EMAIL_TEMPLATES.WELCOME_MESSAGE:
      message = templates.welcomeMessage(data);
      break;
      case EMAIL_TEMPLATES.FORGOT_PASSWORD:
        message = templates.forgotPassword(data);
      break;
      case EMAIL_TEMPLATES.ORDER_CANCELLED:
          message = templates.orderCancelled(data);
      break;
      case EMAIL_TEMPLATES.ORDER_CONFIRMED:
            message = templates.orderConfirmed(data);
            break;
      case EMAIL_TEMPLATES.ORDER_DELIVERED:
              message = templates.orderDelivered(data);
      break;
              case EMAIL_TEMPLATES.ORDER_PLACED:
                message = templates.orderPlaced(data);
      break;
                case EMAIL_TEMPLATES.ORDER_SHIPPED:
                  message = templates.orderShipped(data);
      break;
                  case EMAIL_TEMPLATES.RESET_PASSWORD:
                  message = templates.passwordResetSuccess(data);
      break;
                  case EMAIL_TEMPLATES.SEND_SHIPPING_LABEL:
                    message = templates.sendShippingLabel(data);
      break;
      case EMAIL_TEMPLATES.PAYMENT_FAILED:
        message = templates.paymentFailed(data);
      break;
      default:
      message = '';
  }

  return message;
};
