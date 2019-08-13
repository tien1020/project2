var db = require("../models");

module.exports = function(app) {
  
 //write your routes here
 app.post("/api/student", function(req,res){
    
    db.student.create(req.body).then(function(db){
        res.json(db);
    });
 });
};
