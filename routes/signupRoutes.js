var db = require("../models");

module.exports = function(app) {
  
 //write your routes here
 app.post("/api/student", function(req,res){
    
  try {  db.student.create(req.body).then(function(db){
        res.json(db);
    });}catch{res.json("error")}
 });
};
