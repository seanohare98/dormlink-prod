const router = require('express').Router();
const passport = require('passport');

router.get(
  '/azure',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/sucks' }),
  function(req, res) {
    console.log('Login was called in the Sample');
    res.redirect('/');
  }
);

// POST /auth/openid/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   home page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.post(
  '/azure/redirect',
  passport.authenticate('azuread-openidconnect', {
    failureRedirect: '/failure'
  }),
  function(req, res) {
    console.log('etstingsgsg');
    res.redirect('/');
  }
);

router.get('/logout', function(req, res) {
  req.logout();
  console.log('dfsdf');
  res.redirect('/');
});

module.exports = router;
