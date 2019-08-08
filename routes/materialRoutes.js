var db = require("../models");

module.exports = function(app) {

  
  //  API route for inserting course materials
   app.post("/api/material", function(req, res) {
    console.log(req.body)
    db.courseMaterial.create(req.body).then(function(db) {
      res.json(db);
    });
  });``
  
 app.get("/",function(req,res){
    res.sendfile("./public/test.html");
 })


};
