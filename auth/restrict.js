module.exports = function(req, res, next) {
  // Simple restriction on authenticated users.
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};