const router = require('express').Router();
const passport = require('passport');

router.get(
  '/azure',
  passport.authenticate('azuread-openidconnect', {
    session: false,
    failureRedirect: '/sucks'
  }),
  function(req, res) {
    console.log('Oauth Called!!!');
    res.redirect('/');
  }
);

router.post(
  '/azure/redirect',
  passport.authenticate('azuread-openidconnect', {
    session: false,
    failureRedirect: '/failure'
  }),
  function(req, res) {
    console.log('OAuth Authorized!!!');
    res.redirect('http://localhost:3000');
  }
);

router.get('/logout', function(req, res) {
  req.logout();
  console.log('Logged Out!!!');
  res.redirect('/');
});

module.exports = router;
