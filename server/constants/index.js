exports.ROLES = {
  Admin: 'ROLE ADMIN',
  Member: 'ROLE MEMBER',
  Merchant: 'ROLE MERCHANT'
};

exports.MERCHANT_STATUS = {
  Rejected: 'Rejected',
  Approved: 'Approved',
  Waiting_Approval: 'Waiting Approval'
};

exports.CART_ITEM_STATUS = {
  Processing: 'Processing',
  Shipped: 'Shipped',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled',
  Not_processed: 'Not processed'
};

// Payment_Initiated => Success/Failed => Processing => Shipped => Delivered/Cancelled
exports.ORDER_STATUS = {
  Payment_Initiated: 'Payment Initiated',
  Payment_Success: 'Payment Success',
  Payment_Failed: 'Payment Failed',
  Processing: 'Processing',
  Shipped: 'Shipped',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled',
  Not_processed: 'Not processed'
};

exports.REVIEW_STATUS = {
  Rejected: 'Rejected',
  Approved: 'Approved',
  Waiting_Approval: 'Waiting Approval'
};

exports.EMAIL_PROVIDER = {
  Email: 'Email',
  Google: 'Google',
  Facebook: 'Facebook'
};

exports.EMAIL_TEMPLATES = {
  WELCOME_MESSAGE: "WELCOME_MESSAGE",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  RESET_PASSWORD: "RESET_PASSWORD",
  ORDER_PLACED: "ORDER_PLACED",
  ORDER_CONFIRMED: "ORDER_CONFIRMED",
  ORDER_SHIPPED: "ORDER_SHIPPED",
  ORDER_CANCELLED: "ORDER_CANCELLED",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  ORDER_DELIVERED: "ORDER_DELIVERED",
  SEND_SHIPPING_LABEL: "SEND_SHIPPING_LABEL",
  CONTACT_US: "CONTACT_US"
}
exports.JWT_COOKIE = 'x-jwt-cookie';
