const { default: mongoose } = require("mongoose");

const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    services: [
        {
            type: String,
            required: true
        }
    ],
    price: {
        type: Number,
        required: true
    },
    offerPrice: {
        type: Number,
    }
}, { timestamps: true });

const Package = mongoose.model('packages', packageSchema);
module.exports = Package;