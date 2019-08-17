// exporting models

const { queries: productQuery, mutations: productMutations } = require('./resolvers/product')
const { queries: userQuery, mutations: userMutations } = require('./resolvers/user')
const { queries: orderQuery, mutations: orderMutations } = require('./resolvers/order')

const resolvers = {
    Query: {

        ...productQuery,
        ...userQuery,
        ...orderQuery
        
    },

    Mutation: {

        ...productMutations,
        ...userMutations,
        ...orderMutations
    
    }
}

module.exports.resolvers = resolvers
