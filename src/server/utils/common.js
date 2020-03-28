exports.validateEmail = profile => {
  return (
    profile &&
    profile._json &&
    profile._json.preferred_username.match(
      /^[A-Za-z0-9._%+-]+@link.cuhk.edu.hk$/
    )
  );
};

exports.extractAzureProfile = profile => {
  const { preferred_username: email, name: fullName } = profile._json;
  const sid = email.match(/[^@]+/)[0];
  const last = fullName
    .split(' ')[0]
    .slice(0, -1)
    .toLowerCase();
  const first = fullName.split(' ')[1].toLowerCase();
  return { sid, first, last, email };
};

exports.isAuthenticated = (req, res, next) => {
  if (req.user) return next();
  return res.status(401).json({
    Error: 'User not authenticated.'
  });
};

exports.mySQLCallback = (err, status) => {
  if (err) throw err;
  return status;
};
