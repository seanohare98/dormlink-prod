const neo4j = require('neo4j-driver');
const { ranks, traits } = require('./constants');

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'neo4j'
  )
);

// clear all nodes and relationships
const session = driver.session();
session.run('MATCH (n) DETACH DELETE n;').then(() => {
  session
    .run('UNWIND $props AS map CREATE (n:Trait) SET n.name = map RETURN n', {
      props: traits
    })
    // .then(() => {
    //   session
    //     .run(
    //       'UNWIND $props AS map CREATE (n:Ranking) SET n.rank = map RETURN n',
    //       {
    //         props: ranks
    //       }
    //     )
    .then(async () => {
      await session.close();
    });
});
// });
module.exports = driver;
