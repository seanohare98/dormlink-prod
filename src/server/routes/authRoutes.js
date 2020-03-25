const router = require('express').Router();
const passport = require('passport');

router.get(
  '/azure',
  passport.authenticate('azuread-openidconnect', {
    failureRedirect: '/failure'
  }),
  (req, res) => {
    console.log('Testing Route 1!!!');
    res.redirect('/');
  }
);

router.post(
  '/azure/redirect',
  passport.authenticate('azuread-openidconnect', {
    failureRedirect: '/failure'
  }),
  (req, res) => {
    console.log('OAuth Sucess!!!');
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  console.log('Logged Out!!!');
  res.redirect('/');
});

module.exports = router;
