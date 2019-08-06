const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express')
const mongoose = require('mongoose')
const { typeDefs } = require('./typeDefs')
const { resolvers }  = require('./resolvers')
require('dotenv/config')



const startServer = async () => {
    
    const app = express()

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    server.applyMiddleware({ app }); // app is from an existing express app

    await mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => 
        console.log('Connected to DB')
    ) 

    app.listen({ port: 4000 }, () => 
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )
}

startServer()