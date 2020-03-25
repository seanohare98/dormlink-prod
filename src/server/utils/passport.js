const passport = require('passport');
const { OIDCStrategy } = require('passport-azure-ad');
const jwt = require('jsonwebtoken');

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
      // find user data in database
      const validEmail =
        profile &&
        profile._json &&
        profile._json.preferred_username.match(
          /^[A-Za-z0-9._%+-]+@link.cuhk.edu.hk$/
        );
      if (!validEmail) {
        console.log('Not a CUHK email address...');
      }
      return done(null, profile._json.preferred_username);
    }
  )
);

passport.serializeUser((user, callback) => {
  console.log('Serializing User....');
  callback(null, user);
});

passport.deserializeUser((user, callback) => {
  console.log('Deserializing User...');
  callback(null, user);
});
