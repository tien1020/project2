module.exports = function(req, res, next) {
    // If the user is logged in, continue with the request to the restricted route

    try {
      if (req.user.role=="teacher") {
      return next();
    }
    // If the user isn't' logged in, redirect them to the login page
    
    return res.send("you are not a teacher");} catch{ 
      res.redirect("/teacher-sign.html");
    }
  }; 