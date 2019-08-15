var db = require("../models");

var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/courseMaterial.html"));
  });

  app.get("/courses", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/coursePage.html"));
  });

  // app.get("/question", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/question.html"));
  // });

  app.get("/signin", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signin.html"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

 
};


