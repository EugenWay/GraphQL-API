
const Order = require('../models/Order')
const User = require('../models/User')
const { dateToString } = require('../helpers/date')

module.exports.queries = {
    orders: async () => {
        try {

            const orders = await Order.find().populate('customer')
            return orders

        } catch(err) {

            console.log(err)
            return err
        }
    },
    order: async (_, { _id }) => {
        try {

            const order = await Order.findById({ _id }).populate('customer')
            return order

        } catch(err) {

            console.log(err)
            return err
        }
    }
}

module.exports.mutations = {
    createOrder: async (_,{ _customerID }) => {
           
        const order = await new Order({
            // TODO: remove possibility of collisions
            number: `AR2019${Math.round(Math.random() * 1000)}`,
            customer: _customerID
        })

        try {

            const savedOrder = await order.save()
            const customer = await User.findById({ _id: _customerID })

            if(!customer) throw new Error('User not found')

            await customer.orders.push(savedOrder)
            await customer.save()
            return {
                ...savedOrder._doc,
                created: dateToString(savedOrder.created)
            }

        } catch(err) {

            console.log(err)
            return err
        }

    },
    deleteOrder: async (_, { _id }) => {
        // Issue. When we delete order we dont remove it from user.orders array
        // maybe chenge stastus of order, like "completed, deleted" 

        try {

            const deletedOrder = await Order.findByIdAndDelete( { _id })
            if(deletedOrder === null) throw new Error('Nothing to delete')
            return `OK`

        } catch(err) {

            console.log(err)
            return err
        }
        
    },
    updateStatus: async (_, { _orderID, status }) => {
        
        const updatedOrder = await Order.findByIdAndUpdate({ _id: _orderID }, { $set: { status: status }}, {returnOriginal: false})
        return updatedOrder
    }
}