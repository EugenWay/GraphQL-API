const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        required: true,
        enum: [
            'new',
            'delivery',
            'completed',
            'canceled'
        ],
        default: 'new'
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', orderSchema)
