const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type Query {
    products: [Product!]!
    product(_id: ID!): Product!
    productbyName(title: String!): Product!
    users: [User]!

  }

  type Product {
     _id: ID!
     title: String!
     description: String!
     price: Float!
     inStock: Boolean!
  }

  type Order {
     _id: ID!
     number: Int!
     customer: [User]!
     isDone: Boolean!
  }

  type User {
     _id: ID!
     email: String!
     password: String
  }

  type Mutation {

      createProduct(title: String!, description: String!, price: Float! ): Product!
      updateProduct(_id: ID!, title: String, description: String, price: Float, inStock: Boolean): Product!
      deleteProduct(_id: ID!): Product!

      createUser(email: String!, password: String!) : User

      
  }
`;

module.exports.typeDefs = typeDefs