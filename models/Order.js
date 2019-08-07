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
    }
})

module.exports = mongoose.model('Order', orderSchema)
