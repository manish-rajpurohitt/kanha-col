const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Order Schema
const PaymentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    total: {
        type: Number,
        default: 0
    },
    webhookResponse: {
        type: String,
        default: null
    },
    returnResponse: {
        type: String,
        default: null
    },
    paymentStatus: {
        type: String,
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = Mongoose.model('Payment', PaymentSchema);
