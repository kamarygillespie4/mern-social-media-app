const { ApolloServer } = require("apollo-server");
//Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client
const { graphql } = require("graphql");
//GraphQL is an open source query language that describes how a client should request information through an API. In a broad sense, GraphQL is a syntax developers can use to ask for specific data and return that data from multiple sources

const mongoose = require("mongoose");
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js

const resolvers = require("./graphql/resolvers");

const { MONGODB } = require("./config.js");
//creates connection to MongoDB database

const typeDefs = require("./graphql/typeDefs");

//creates a new instance of the apollo server and passes it the typedefs and resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//establishes connection to the database and starts the server on port 4000
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: 4000 });
  })

  .then((res) => {
    console.log(`Server Running at ${res.url}`);
  });
