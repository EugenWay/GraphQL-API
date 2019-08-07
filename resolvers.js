// exporting models
const bcrypt = require('bcryptjs')
const Product = require('./models/Product')
const User = require('./models/User')
const Order = require('./models/Order')
const { dateToString } = require('./helpers/date')


const resolvers = {
    Query: {

        products: async () => {
            try {
                const products = await Product.find()
                return products
            } catch(err) {
                console.log(err)
                return err
            }
        },
        product: async (_, { _id }) => {
            try {
                const product = await Product.findById({ _id })
                return product
            } catch(err) {
                console.log(err)
                return err
            }
        },

        users: async () => {
            try {
                const users = await User.find().populate('orders')
                for (user of users) {
                    user.password = null
                }
                return users
            } catch(err) {
                console.log(err)
                return err
            }
            
        },
        user: async (_, { _id }) => await User.findById({ _id }).populate('orders'),
        orders: async () => await Order.find().populate('customer'),
        order: async (_, { _id }) => await Order.findById({ _id }).populate('customer')
    },

    Mutation: {
        createProduct: async (_, { title, description, price }) => {
            const product = new Product({ title, description, price })
            await product.save()
            console.log(product)
            return product
        }, 
        updateProduct: async (_, { _id , ...args }) => {
            const updatedProduct = await Product.findOneAndUpdate({ _id }, { $set: { ...args } }, {returnOriginal: false} )
            console.log(`Product with ${_id} was updated`)
            return updatedProduct
        },
        deleteProduct: async (_, _id ) => {
            const deletedProduct = await Product.findByIdAndDelete( _id )
            console.log(`Product was deleted`)
            return deletedProduct
        },
        
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
                console.log(err);
                return err;
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
        },

        createUser: async (_,{ email, password }) => {
            
            try {

                // Checking if exist user by e-mail in data-base
                await User.findOne({email}).then(user => {
                    if(user) {
                        throw new Error('Oops. User exists already.')
                    }
                })

                //Salt our password
                const hashedPassword  = await bcrypt.hash(password, 12)

                // Create new user 
                const user = await new User({
                    email: email,
                    password: hashedPassword
                })

                await user.save()

                user.password = null
                console.log(user)
                return user

            } catch(err) {
                console.log(err)
                return err  
            }
            
        }
    }
}

module.exports.resolvers = resolvers
