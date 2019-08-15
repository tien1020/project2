var db = require("../models");

module.exports = function (app) {

var Sequelize = require('sequelize');
var sequelize = new Sequelize('skcig609ntkevc2l', 'nnn6xuangui1j3jx', 'awop8k5pifd36uk1',{
  host: 'wvulqmhjj9tbtc1w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  dialect: "mysql"
});

app.get("/api/question",function(req,res){
  db.forumQuestion.findAll({}).then(function(dbforumQuestion) {
      res.json(dbforumQuestion);
});
});


app.get("/api/topics/:id",function(req,res){


    sequelize.query("SELECT * FROM questionanswerview where answer_forumQuestionId ="+req.params.id, { type: sequelize.QueryTypes.SELECT})
  .then(dbforumQuestion=> {
 
    console.log(dbforumQuestion)
    if( dbforumQuestion[0] !=undefined)
    {
      res.render("answer",{layout:"user",answer: dbforumQuestion,
        title: dbforumQuestion[0].question_title,
        description: dbforumQuestion[0].question,
      id: parseInt(req.params.id)
      });
    }
    else
    {
      db.forumQuestion.findOne({ where: { id: req.params.id } }).then(function(dbforumQuestion) {
   console.log(dbforumQuestion)
    res.render("answer",{layout:"user",
      answer: "",
      title: dbforumQuestion.title,
      description: dbforumQuestion.question,
     id:       parseInt(req.params.id)   
    });
  });
    }
 
    // We don't need spread here, since only the results will be returned for select queries
  })



  // db.forumQuestion.findOne({ where: { id: req.params.id } }).then(function(dbforumQuestion) {
  //  console.log(dbforumQuestion)
  //   res.render("answer",{title: dbforumQuestion.title,
  //    question: dbforumQuestion.question,
  //    id:        dbforumQuestion.id    
  //   });
  // });


});



app.get("/question",function(req,res){
  // sequelize.query("SELECT * FROM questionanswerview", { type: sequelize.QueryTypes.SELECT})
  // .then(dbforumQuestion=> {
  //   data={question:dbforumQuestion}
  //   console.log(dbforumQuestion)
  //  res.render("question",data);
  //   // We don't need spread here, since only the results will be returned for select queries
  // })


  db.forumQuestion.findAll({
       order: [['createdAt', 'DESC']]
  }).then(function(dbforumQuestion) {
       data={question:dbforumQuestion}
  //   console.log(dbforumQuestion)
      res.render("question",{layout:"user",question:dbforumQuestion});
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

app.get("/answer",function(req,res){
  db.forumQuestion.findAll({}).then(function(dbforumQuestion) {
    data={question:dbforumQuestion}
    res.render("answer",{layout:"user",question:dbforumQuestion});
    
});

});
app.get("/api/answer",function(req,res){
  db.forumAnswer.findAll({}).then(function(dbforumAnswer) {
      res.json(dbforumAnswer);
});
});

app.post("/api/topics/:id", function (req, res) {
  console.log("answer: "+req.body) 
  db.forumAnswer.create({
  answer:  req.body.answer,
  forumQuestionId: parseInt( req.body.forumQuestionId)
  }).then(function (dbforumAnswer) {

    res.render("answer",{layout:"user",answer: dbforumAnswer.answer 
      
       });
  });
});

};
