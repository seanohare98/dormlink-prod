const router = require('express').Router();
const connection = require('../utils/mysqlConfig');
const { isAuthenticated } = require('../utils/common');

router.get('/', isAuthenticated, (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

module.exports = router;
