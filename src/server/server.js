const env = require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const setupPassport = require('./utils/passport');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 8080;
const DIST_PATH = path.join(__dirname, '../../dist');
const HTML_FILE = path.join(DIST_PATH, 'index.html');
app.use(session({ secret: 'cats' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(DIST_PATH));
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
