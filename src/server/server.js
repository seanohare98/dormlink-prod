require('dotenv').config();
const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./auth/passportConfig');
const typeDefs = require('./data/typeDefs');
const resolvers = require('./data/resolvers');
const db = require('./models');
const authRoutes = require('./auth/authRoutes');
const { isAuthenticated } = require('./utils/common');

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { db, req };
  }
});
db.sequelize.authenticate();
db.sequelize.sync({
  force: true
});
const PORT = process.env.PORT || 8080;
const DIST_PATH = path.join(__dirname, '../../dist');
const HTML_FILE = path.join(DIST_PATH, 'index.html');
app.use(express.static(DIST_PATH));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use('/graphql', isAuthenticated);
server.applyMiddleware({ app });
app.get('*', (req, res) => res.sendFile(HTML_FILE));
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
