const { ApolloServer } = require("apollo-server");
//Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client
const { graphql } = require("graphql");
//GraphQL is an open source query language that describes how a client should request information through an API. In a broad sense, GraphQL is a syntax developers can use to ask for specific data and return that data from multiple sources
const gql = require("graphql-tag");
//The gql template literal tag can be used to concisely write a GraphQL query that is parsed into a standard GraphQL AST
const mongoose = require("mongoose");
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js

const Post = require("./models/Post");
//const User = require("./models/User");
const { MONGODB } = require("./config.js");
//creates connection to MongoDB database

//typeDefs is a required argument and should be a GraphQL schema language string or array of GraphQL schema language strings or a function that takes no arguments and returns an array of GraphQL schema language strings
const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type Query {
    getPosts: [Post]
  }
`;

//A resolver is a function that's responsible for populating the data for a single field in your schema. It can populate that data in any way you define, such as by fetching data from a back-end database or a third-party API.
const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

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
