const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports.queries = {
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
    user: async (_, { _id }) => await User.findById({ _id }).populate('orders')
}

module.exports.mutations = {
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