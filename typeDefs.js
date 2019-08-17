const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type Query {
    products: [Product!]!
    product(_id: ID!): Product!
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
     number: String!
     customer: User!
     status: String!
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
      updateStatus(_orderID: ID!, status: String!): Order!
   
  }
`;

module.exports.typeDefs = typeDefs