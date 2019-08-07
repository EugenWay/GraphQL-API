const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type Query {
    products: [Product!]!
    product(_id: ID!): Product!
    productbyName(title: String!): Product!
    users: [User]!
    user(_id: ID!): User!
    orders: [Order!]!
    order(_id: ID!): Order!
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
     customer: User!
     isDone: Boolean!
     created: String!
  }

  type User {
     _id: ID!
     email: String!
     password: String
     orders: [Order!]
  }

  type Mutation {

      createProduct(title: String!, description: String!, price: Float! ): Product!
      updateProduct(_id: ID!, title: String, description: String, price: Float, inStock: Boolean): Product!
      deleteProduct(_id: ID!): Product!
      createUser(email: String!, password: String!): User!
      createOrder(_customerID: ID!): Order!
      deleteOrder(_id: ID!): String
   
  }
`;

module.exports.typeDefs = typeDefs