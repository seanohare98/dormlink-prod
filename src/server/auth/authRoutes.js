const router = require('express').Router();
const passport = require('passport');
const { isAuthenticated } = require('../utils/common');

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

router.get(
  '/logout',
  passport.authenticate('azuread-openidconnect'),
  (req, res) => {
    req.logOut();
    res.redirect('/');
    // todo: remove session from redis session store
  }
);

router.get('/user', isAuthenticated, (req, res) => {
  res.json({ id: req.user });
});

module.exports = router;
