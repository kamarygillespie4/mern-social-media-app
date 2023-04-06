//A resolver is a function that's responsible for populating the data for a single field in your schema. It can populate that data in any way you define, such as by fetching data from a back-end database or a third-party API.

const postsResolvers = require("./posts");
const usersResolvers = require("./users");

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
};
