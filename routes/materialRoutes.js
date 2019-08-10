var db = require("../models");
var sequelize = require("sequelize")
var upload = require("../config/upload")
module.exports = function (app) {


  //  API route for inserting course materials


  app.get("/", function (req, res) {
    res.sendfile("./public/test.html");
  })
  app.get("/api/go-course", function (req, res) {

    db.courseMaterial.findAll({}).then(function (result) {
      data = { material: result }
      res.render("materialcreation", data);
    });
  })



  app.post("/upload", upload.single("photo"), function (req, res) {
    console.log(req.file.filename)

  }); ``

  app.get("/course_admin", function (req, res) {
    db.courseMaterial.findAll({
      attributes: [[sequelize.fn("distinct", sequelize.col("week_number")), "week"]]

    }).then(function (data) {
      console.log(data[0].dataValues);
      week = [];
      for (i = 0; i < data.length; i++) {
        weeknum = data[i].dataValues;
        week.push(weeknum)
      }
      console.log(week);
      var myobject = {
        weekList: week}
      res.render("course-weeks", myobject);

    })



  })
  // app.get("/course_admin/week/:weeknum",function(req,res){
  //   weeknum=parseInt(req.params.weeknum);
  //   console.log(weeknum);
  //   db.courseMaterial.findAll({
  //     where:{
  //       week_number:weeknum
  //     }
  //   }).then(function(result){
  //     console.log(result)
  //     data={material:result}
  //     res.render("display-week",data);
  //     });
  //   })

  // app.get("/course_admin/week/:weeknum",function(req,res){
  //   weeknum=req.params.weeknum;
  //   db.courseMaterial.max("chapter_number",{where:{week_number:weeknum}}).then(function(data){
  //     console.log(data)
  //     chap=[];
  //     for(i=1;i<data+1;i++){
  //       chap.push({num:i})
  //     }

  //     myobject={chapnum:chap};
  //     res.render("display-chapters",myobject);
  //     console.log(myobject);

  //   })



  // })

  app.get("/course_admin/week/:weeknum", function (req, res) {
    var weeknum = req.params.weeknum;
    db.courseMaterial.findAll({
      attributes: [[sequelize.fn("distinct", sequelize.col("chapter_number")), "chapter"]],
      where: { week_number: weeknum }
    }).then(function (data) {
     
      console.log(data[0].dataValues);
      chapter = [];
      for (i = 0; i < data.length; i++) {
       var chapnum = data[i].dataValues;
        chapter.push(chapnum)
      }
      console.log(chapter);
      var myobject = { chapterList: chapter,
      weeknum:weeknum }
      res.render("display-chapters", myobject);

    })

  })

  app.get("/course_admin/week/:weeknum/:chapnum",function(req,res){
  var weeknum = req.params.weeknum;
   var chapnum = req.params.chapnum;
   console.log(weeknum);
   console.log(chapnum);

     db.courseMaterial.findAll({
      where:{
        week_number:weeknum,
        chapter_number:chapnum
      }
    }).then(function(result){
      console.log(result)
      data={material:result}
      res.render("display-course",data);
  })
});

app.post("/course_admin/add-section",upload.single("photo"),function (req, res) {
  
  console.log(req.body.material);
        queryValue=req.body.material;
        queryValue=JSON.parse(queryValue);
        queryValue["image_url"]=req.file.filename
        
        // console.log(queryValue);
        console.log(req.file)
  db.courseMaterial.create(queryValue).then(function (response) {
     
      
      res.json(response)
  }

); 

});

};


