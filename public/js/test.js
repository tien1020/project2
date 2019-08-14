$(document).on("click","#bsum", function(){
    console.log("i clicked on ok");
    weekNum=$(".week-number").val().trim();
    chapterNum=$(".chapter-number").val().trim();
    chapterTitle=$(".chapter-title").val().trim();
    sectionTitle=$(".section-title").val().trim();
    sectionNumber=$(".section-number").val().trim();
    info=$(".info").val().trim();
    
    material={
        week_number:weekNum,
        chapter_number:chapterNum,
        chapter_title:chapterTitle,
        title:sectionTitle,
        order_in_chapter:sectionNumber,
        material:info
    }
    data=JSON.stringify(material)
    console.log(data);
    saveMaterial(data).then(function(res){
        console.log("success");
        window.location.href = "/api/go-course";
    })
   
});












 function saveMaterial(data) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/material",
      data:data
      
    });
  }