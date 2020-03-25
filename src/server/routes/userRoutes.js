const router = require('express').Router();

const isAuthenticated = (req, res, next) => {
  if (req.user) return next();
  else {
    return res.status(401).json({
      error: 'User not authenticated'
    });
  }
};

router.get('/', isAuthenticated, (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

module.exports = router;
