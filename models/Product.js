const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    } 
})

module.exports = mongoose.model('Product', productSchema)