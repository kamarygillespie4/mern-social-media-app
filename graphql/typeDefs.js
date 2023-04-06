const { graphql } = require("graphql");
//GraphQL is an open source query language that describes how a client should request information through an API. In a broad sense, GraphQL is a syntax developers can use to ask for specific data and return that data from multiple sources

//typeDefs is a required argument and should be a GraphQL schema language string or array of GraphQL schema language strings or a function that takes no arguments and returns an array of GraphQL schema language strings

const gql = require("graphql-tag");
//The gql template literal tag can be used to concisely write a GraphQL query that is parsed into a standard GraphQL AST
module.exports = gql`
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
