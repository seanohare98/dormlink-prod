const router = require('express').Router();
const { isAuthenticated } = require('../utils/common');

router.get('/', isAuthenticated, (req, res) => {
  res.send(req.user);
});

module.exports = router;
