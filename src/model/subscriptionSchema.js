const { default: mongoose } = require("mongoose");

const subscriptionUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    }
}, { timestamps: true })

const SubscriptionUser = mongoose.model('subscriptionusers', subscriptionUserSchema);
module.exports = SubscriptionUser;