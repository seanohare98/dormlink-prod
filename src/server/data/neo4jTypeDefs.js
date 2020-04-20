const fs = require('fs');
const path = require('path');

module.exports = fs
  .readFileSync(path.join(__dirname, 'neo4jSchema.graphql'))
  .toString('utf-8');
