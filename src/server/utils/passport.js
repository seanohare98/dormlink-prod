const passport = require('passport');
const { OIDCStrategy } = require('passport-azure-ad');
const jwt = require('jsonwebtoken');

passport.initialize();

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
      validateIssuer: false,
      allowHttpForRedirectUrl: true,
      useCookieInsteadOfSession: true,
      cookieEncryptionKeys: [
        { key: '12345678901234567890123456789012', iv: '123456789012' }
      ]
    },
    (iss, sub, profile, accessToken, refreshToken, done) => {
      console.log('PROFILE_OFFICE_ID: ', profile._json.oid);
      console.log('EMAIL ADDRESS: :', profile._json.preferred_username);
      console.log('REFRESHTOKEN:', refreshToken);

      return done(null, profile._json.preferred_username);
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
