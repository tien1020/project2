path= require("path")

var db = require("../models");
var sequelize = require("sequelize")
var upload = require("../config/upload")
var passport = require("../config/passport")
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

  app.get("/courseweeks/:cid",function (req, res) {
    
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
      var myobject = {
        cid:req.params.cid,
        weekList: week}
      res.render("course-weeks", myobject);

    })



  })



app.get("/admin_course_list",function(req,res){
  console.log("what i need now",req.user)
  if (req.user){
    tid=req.user.id;
    db.courseTable.findAll({where:{tid:tid}}).then(function (data) {
      console.log(data[0].dataValues);
     
       res.render("course-list",{course:data});
    })


  }
  else{
    res.sendFile(path.join(__dirname, "../public/teacher-sign.html"));

  }
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

  app.get("/coursechapters/:cid/:week", function (req, res) {
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
      var myobject = { chapterList: chapter,
      cid:cid,
      week:week }
      res.render("display-chapters", myobject);

    })

  })

  app.get("/chapterdisplay/:cid/:week/:chapter",function(req,res){
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
     
      console.log(response);
      res.json(response);
  }

); 

});

app.post("/teacher-sign-in", passport.authenticate("local"), function(req, res) {
 console.log( "this is the request.user  ",req.user);
  res.json("/admin_course_list");
});

app.get("/teacher-sign",function(req,res){
  
  if (req.user) {
    console.log("this is the user",req.user);
    res.redirect("/admin_course_list");
    
  }
  res.sendFile(path.join(__dirname, "../public/teacher-sign.html"));
  
});

app.delete("/delete-section",function(req,res){
 db.courseMaterial.destroy({ where: req.body }).then(function(data) {
  res.json(data);
});
});


app.post("/create-course",upload.single("photo"),function (req, res) {
  
  console.log(req.user);
        queryValue=req.body.courseInfo;
        queryValue=JSON.parse(queryValue);
        queryValue["course_image"]=req.file.filename;
        queryValue["tid"]=req.user.id;
        
        // console.log(queryValue);
        console.log(req.file)
  db.courseTable.create(queryValue).then(function (response) {
     
      
      console.log("this is the course id what i am looking for" ,response.dataValues.cid);

      res.json("/courseweeks/"+response.dataValues.cid);
  }

); 

});
app.get("/add-week/:cid",function(req,res){
  courseId={cid: req.params.cid}

  res.render("add-week",courseId);
})
app.get("/add-chapter/:cid/:week",function(req,res){
  console.log("want to add week")
  parameters={cid:req.params.cid,
               week:req.params.week} 

  res.render("add-chapter",parameters);
  
})


};


