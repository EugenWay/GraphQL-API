const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // orders: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Order'
    //     }
    // ]
})

module.exports = mongoose.model('User', userSchema)