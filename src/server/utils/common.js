exports.validateEmail = profile => {
  console.log(profile._json);
  return (
    profile &&
    profile._json &&
    profile._json.preferred_username.match(/^[A-Za-z0-9._%+-]+@msu.edu$/)
  );
};

exports.extractAzureProfile = profile => {
  const { preferred_username: email, name: fullName } = profile._json;
  const lastName = fullName
    .split(' ')[0]
    .slice(0, -1);
  const firstName = fullName.slice(fullName.indexOf(' '));
  return { firstName, lastName, email };
};

exports.isAuthenticated = (req, res, next) => {
  if (req.user) return next();
  return res.status(401).json({
    Error: 'User not authenticated.'
  });
};

exports.isCompleteAuthenticated = (req, res, next) => {
  if (req.user && req.user.isComplete) return next();
  return res.status(401).json({
    Error: 'User profile not complete.'
  });
};
