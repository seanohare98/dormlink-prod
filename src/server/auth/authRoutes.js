const router = require('express').Router();
const passport = require('passport');
const { isAuthenticated } = require('../utils/common');
const User = require('../models').user;
const Hobby = require('../models').hobby;

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
    if (err) res.redirect('/error');
    res.redirect('/');
  });
});

router.get('/user', isAuthenticated, async (req, res) => {
  const userWithHobbies = await User.findAll({
    where: { email: req.user.email },
    include: [
      {
        model: Hobby,
        attributes: ['name'],
        through: {
          attributes: [] // this helps removing the join table in returned data
        }
      }
    ]
  });
  req.user = userWithHobbies[0].dataValues;
  req.user.hobbies = req.user.hobbies.map(({ dataValues }) => dataValues.name);
  res.json(req.user);
});

module.exports = router;
