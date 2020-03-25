const env = require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passportInit = require('./utils/passport');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 8080;
const DIST_PATH = path.join(__dirname, '../../dist');
const HTML_FILE = path.join(DIST_PATH, 'index.html');

// app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(DIST_PATH));
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
