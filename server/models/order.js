const Mongoose = require('mongoose');
const { UPDATE_ORDER_STATUS } = require('../../client/app/containers/Order/constants');
const { CART_ITEM_STATUS, ORDER_STATUS } = require('../constants');
const { Schema } = Mongoose;

// Order Schema
const OrderSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address'
  },
  total: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: ORDER_STATUS.Payment_Initiated,
    enum: [
      ORDER_STATUS.Payment_Initiated,
      ORDER_STATUS.Payment_Success,
      ORDER_STATUS.Payment_Failed,
      ORDER_STATUS.Processing,
      ORDER_STATUS.Shipped,
      ORDER_STATUS.Delivered,
      ORDER_STATUS.Cancelled,
    ]
  },
  cashfreeId: {
    type: String
  },
  paymentSessionId: {
    type: String
  },
  paymentRetryCount: {
    type: Number,
    default: 0
  },
  cancelReason: {
    type: String
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Order', OrderSchema);
