var db = require("../models");

module.exports = function (app) {

var Sequelize = require('sequelize');
var sequelize = new Sequelize('exampledb', 'Dawid', 'Element1234!',{
  host: 'localhost',
  dialect: "mysql"
});

app.get("/api/question",function(req,res){
  db.forumQuestion.findAll({}).then(function(dbforumQuestion) {
      res.json(dbforumQuestion);
});
});

app.get("/question",function(req,res){
  // sequelize.query("SELECT * FROM questionanswerview", { type: sequelize.QueryTypes.SELECT})
  // .then(dbforumQuestion=> {
  //   data={question:dbforumQuestion}
  //   console.log(dbforumQuestion)
  //  res.render("question",data);
  //   // We don't need spread here, since only the results will be returned for select queries
  // })


  db.forumQuestion.findAll({}).then(function(dbforumQuestion) {
       data={question:dbforumQuestion}
  //   console.log(dbforumQuestion)
      res.render("question",data);
   });
 
});

app.post("/api/question", function (req, res) {
  db.forumQuestion.create(req.body).then(function (dbforumQuestion) {
      res.json(dbforumQuestion);
  });
});

app.post("/api/answer", function (req, res) {
  console.log(req.body)
  db.forumAnswer.create(req.body).then(function (dbforumAnswer) {
      res.json(dbforumAnswer);
  });
});

// app.get("/question",function(req,res){
//   db.forumAnswer.findAll({}).then(function(dbforumAnswer) {
//     data={answer:dbforumAnswer}
//     res.render("question",data);
// });
// });


};
