var db = require("../models");
var passport = require("../config/passport");
var sequelize = require("sequelize");
var isAstudent=require("../config/isAstudent");
var upload = require("../config/upload")
module.exports = function (app) {
  app.get("/", function (req, res) {
    console.log("hani")
    db.courseTable.findAll().then(function (data) {
     try{ console.log(data[0].dataValues)}
     catch(error){
       dara={};
     }

      res.render("index", {
        layout: "user", course: data
      });
    })

  })

  app.post("/student-sign-in", passport.authenticate("local"), function (req, res) {
    console.log("this is the request.user  ", req.user);
    res.json("/")
  });

  app.get("/checkIfLogedIn", function (req, res) {
    if (req.user) {
      res.json(req.user);
    }
    else {
      res.json("no");
    }
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  //   app.get("/student-course/:cid",function(req,res){
  //     db.courseMaterial.findAll({
  //         attributes: [[sequelize.fn("distinct", sequelize.col("week_number")), "week"]],
  //         where:{course_id:req.params.cid}
  //       }).then(function (data) {
  //         console.log(data);
  //         week = [];
  //         for (i = 0; i < data.length; i++) {
  //           weeknum = data[i].dataValues;
  //           week.push(weeknum)
  //         }
  //         console.log(week);

  //         res.render("student-course-weeks", {layout:"user",weeks:{cid:req.params.cid,
  //             weekList: week

  //         }
  //     });
  //   })

  // });
  app.get("/student-course/:cid",isAstudent, function (req, res) {
   var cid = req.params.cid;
    
   var week=[];
   getWeekAndChapters(cid,function(data){
    res.render("student-course-weeks", {
      layout: "user", weeks: {
        cid: cid,
        weekList: data

      }
   }); 
   console.log(week)
    
        
        });

      })
    
  


  app.get("/student-course-chapters/:cid/:week",isAstudent, function (req, res) {
    var week = req.params.week;
    var cid = req.params.cid;
    db.courseMaterial.findAll({
      attributes: [[sequelize.fn("distinct", sequelize.col("chapter_number")), "chapter"]],
      where: {
        week_number: week,
        course_id: cid
      }
    }).then(function (data) {

      console.log(data[0].dataValues);
      chapter = [];
      for (i = 0; i < data.length; i++) {
        var chapnum = data[i].dataValues;
        chapter.push(chapnum)
      }
      console.log(chapter);

      res.render("student-course-chapters", {
        layout: "coursepage", myobject: {
          chapterList: chapter,
          cid: cid,
          week: week
        }
      });

    });
  })


  app.get("/student-course-display/:cid/:week/:chapter",isAstudent,function (req, res) {
    var cid = req.params.cid;
    var week = req.params.week;
    var chap = req.params.chapter;

    console.log(week);
    console.log(chap);

    db.courseMaterial.findAll({
      where: {
        week_number: week,
        chapter_number: chap,
        course_id: cid
      },
      
    }).then(function (result) {

      getWeekAndChapters(cid,function(data){
        console.log("what i need", data);
        res.render("student-course-display", {
          layout: "user", course:{
            cid:cid,
            section:result,
            weekList:data
          } 
        })
      })
      
     
    });
  })










  function getWeekAndChapters(cid,callback){
    var week;
    db.courseMaterial.findAll({
      where: { course_id: cid },
      attributes: ["week_number", "chapter_number"],
      group: ["week_number", "chapter_number"]
    }).then(function (response) {
      // console.log(response)

      db.courseMaterial.findAll({
        attributes: [[sequelize.fn("distinct", sequelize.col("week_number")), "week"]],
        where: { course_id: cid }
      }).then(function (data) {
        // console.log(data);
        week = [];
        for (i = 0; i < data.length; i++) {
          weeknum = {
            week: data[i].dataValues.week,
            chapter: []
          };
          week.push(weeknum)

        }
        // console.log(week);

        for (i = 0; i < response.length; i++) {
          chapterNumb = response[i].dataValues.chapter_number;
          weekIndex = response[i].dataValues.week_number - 1;
          week[weekIndex].chapter.push(chapterNumb);
         
        }
        // console.log(week);
        callback(week);

      })
      
    })
     }


app.get("/get-courses",function(req,res){
  db.courseTable.findAll().then(function(data){

    res.render("getcourse",{layout:"user",course:data})
  })
})

app.get("/profile",isAstudent,function(req,res){
  db.student.findAll({where:{id:req.user.id}}).then(function(data){
    console.log("what i need",data[0].dataValues)
  res.render("profile",{layout:"user",user:data[0].dataValues})})
});

app.post("/profile-update",upload.single("photo"),function(req,res){
  db.student.update({picture:req.file.filename},{where: {id:req.user.id}}
    ).then(function(data){
      res.json(data);
    })
})


};
