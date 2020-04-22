const router = require('express').Router();
const passport = require('passport');
const { isAuthenticated } = require('../utils/common');
const User = require('../models').user;

router.get(
  '/azure',
  passport.authenticate('azuread-openidconnect', {
    successRedirect: '/',
    failureRedirect: '/error'
  })
);

router.post(
  '/azure/redirect',
  passport.authenticate('azuread-openidconnect', {
    failureRedirect: '/error'
  }),
  (req, res) => {
    if (req.user.isComplete) res.redirect('/');
    else res.redirect('/register');
  }
);

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/');
  });
});

router.get('/user', isAuthenticated, async (req, res) => {
  const user = await User.findAll({ where: { sid: req.user.sid } });
  user[0].dataValues.sid = user[0].dataValues.sid.toString();
  req.user = user[0].dataValues;
  res.json(req.user);
});

module.exports = router;
