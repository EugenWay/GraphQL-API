const Product = require('../models/Product')

module.exports.queries = {
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

}

module.exports.mutations = {
    
    createProduct: async (_, args) => {
        console.log(args)
        const product = new Product(args)
        await product.save()
        console.log(product)
        return product
    }, 
    updateProduct: async (_, { _id , ...args }) => {
        const updatedProduct = await Product.findOneAndUpdate({ _id }, { $set: args }, {returnOriginal: false} )
        console.log(`Product with ${_id} was updated`)
        return updatedProduct
    },
    deleteProduct: async (_, _id ) => {
        const deletedProduct = await Product.findByIdAndDelete( _id )
        console.log(`Product was deleted`)
        return deletedProduct
    }
}

