const passport = require('passport');
const { OIDCStrategy } = require('passport-azure-ad');
const jwt = require('jsonwebtoken');

passport.initialize();
passport.session();
passport.use(
  new OIDCStrategy(
    {
      identityMetadata: process.env.IDENTITY_METADATA,
      clientID: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_CLIENT_SECRET,
      scope: process.env.SCOPE,
      redirectUrl: process.env.AZURE_REDIRECT_URL,
      responseType: process.env.RESPONSE_TYPE,
      responseMode: process.env.RESPONSE_MODE,
      passReqToCallback: false,
      allowHttpForRedirectUrl: true
    },
    (iss, profile, done) => {
      console.log(profile, 'verification called');

      return done(null, profile);
    }
  )
);

passport.serializeUser((user, callback) => {
  console.log('serializing user.');
  callback(null, user.id);
});

passport.deserializeUser((user, callback) => {
  console.log('deserialize user.');
  callback(null, user.id);
});
