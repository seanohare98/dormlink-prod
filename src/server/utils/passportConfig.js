const passport = require('passport');
const { OIDCStrategy } = require('passport-azure-ad');
const { validateEmail } = require('./common.js');
const User = require('../services/userServices.js');

passport.use(
  new OIDCStrategy(
    {
      identityMetadata: process.env.AZURE_IDENTITY_METADATA,
      clientID: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_CLIENT_SECRET,
      scope: process.env.AZURE_SCOPE,
      redirectUrl: process.env.AZURE_REDIRECT_URL,
      responseType: process.env.AZURE_RESPONSE_TYPE,
      responseMode: process.env.AZURE_RESPONSE_MODE,
      passReqToCallback: true,
      validateIssuer: false,
      allowHttpForRedirectUrl: true,
      useCookieInsteadOfSession: true,
      cookieEncryptionKeys: [
        {
          key: process.env.PASSPORT_COOKIE_KEY,
          iv: process.env.PASSPORT_COOKIE_IV
        }
      ]
    },
    (req, iss, sub, profile, accessToken, refreshToken, done) => {
      if (!validateEmail(profile)) return done(null, false);

      return User.findOrCreate(profile, user => {
        done(null, user);
      });
    }
  )
);

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((user, callback) => {
  callback(null, user);
});
