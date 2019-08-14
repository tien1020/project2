var db = require("../models");
var passport = require("../config/passport");
var sequelize = require("sequelize");
module.exports = function(app) {
    app.get("/return",function(req,res){
        console.log("hani")
        db.courseTable.findAll().then(function(data){
          console.log(data[0].dataValues)
            
            res.render("index",{layout:"user",course:data
        });
        })
     
    })

    app.post("/student-sign-in", passport.authenticate("local"), function(req, res) {
        console.log( "this is the request.user  ",req.user);
         res.json("/return")
       });
 
       app.get("/checkIfLogedIn", function(req, res) {
        if (req.user){
            res.json(req.user);
        }
        else{
            res.json("no");
        }
       });
 
       app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
      });

      app.get("/student-course/:cid",function(req,res){
        db.courseMaterial.findAll({
            attributes: [[sequelize.fn("distinct", sequelize.col("week_number")), "week"]],
            where:{course_id:req.params.cid}
          }).then(function (data) {
            console.log(data);
            week = [];
            for (i = 0; i < data.length; i++) {
              weeknum = data[i].dataValues;
              week.push(weeknum)
            }
            console.log(week);
            
            res.render("student-course-weeks", {layout:"coursepage",weeks:{cid:req.params.cid,
                weekList: week

            }
        });
      })

    });
     
      app.get("/student-course-chapters/:cid/:week",function(req,res){
        var week = req.params.week;
        var cid=req.params.cid;
        db.courseMaterial.findAll({
          attributes: [[sequelize.fn("distinct", sequelize.col("chapter_number")), "chapter"]],
          where: { week_number: week,
                   course_id:cid           }
        }).then(function (data) {
         
          console.log(data[0].dataValues);
          chapter = [];
          for (i = 0; i < data.length; i++) {
           var chapnum = data[i].dataValues;
            chapter.push(chapnum)
          }
          console.log(chapter);
          
          res.render("student-course-chapters", {layout:"coursepage",myobject:{ chapterList: chapter,
            cid:cid,
            week:week }});
    
        });
      })


      app.get("/student-course-display/:cid/:week/:chapter",function(req,res){
        var cid=req.params.cid;
      var week = req.params.week;
       var chap = req.params.chapter;
    
       console.log(week);
       console.log(chap);
    
         db.courseMaterial.findAll({
          where:{
            week_number:week,
            chapter_number:chap,
            course_id:cid
          }
        }).then(function(result){
          console.log(result)
          data={material:result}
          res.render("student-course-display",{layout:"coursepage",course:data
      })
    });
})
};
