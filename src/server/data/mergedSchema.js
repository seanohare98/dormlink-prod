const { makeExecutableSchema, mergeSchemas } = require('graphql-tools');
const { makeAugmentedSchema } = require('neo4j-graphql-js');
const neo4jTypeDefs = require('./neo4jTypeDefs');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const neo4jSchema = makeAugmentedSchema({
  typeDefs: neo4jTypeDefs,
  config: {
    query: {
      exclude: []
    },
    mutation: {
      exclude: []
    }
  }
});

const restSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const mergedSchema = mergeSchemas({
  subschemas: [{ schema: neo4jSchema }, { schema: restSchema }]
});

module.exports = mergedSchema;
