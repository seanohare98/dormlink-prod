const router = require('express').Router();
const passport = require('passport');

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
    else res.redirect('/registration');
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

module.exports = router;
