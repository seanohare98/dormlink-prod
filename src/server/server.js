require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./utils/passportConfig');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 8080;
const DIST_PATH = path.join(__dirname, '../../dist');
const HTML_FILE = path.join(DIST_PATH, 'index.html');
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
app.use(express.static(DIST_PATH));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
