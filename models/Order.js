const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isDone: {
        type: Boolean,
        required: true,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', orderSchema)
