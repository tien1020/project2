console.log("here i am")

$(document).on("click","#thisone", function (event) {
    event.preventDefault();
  
    var newQuestion = {
        title: $("#title").val().trim(),
        question: $("#question").val().trim()
    }
    console.log(newQuestion)
    $.ajax("/api/question", {
        type: "POST",
        data: newQuestion
    }).then(
        function () {
            console.log("New question created!")
            location.reload();
        }
    )
})
$("#replyTo").on("click",function(event){
    var id= $(this).attr("data-id")
    $.ajax({
        url: "api/topics/"+id,
        type: "GET"
      }).then(function(){

      })
})



$(document).on("click","#replayId" ,function (event) {
    event.preventDefault();
    // alert("onclick..!"+ $("#answer"+$(this).attr("data-id") ).val().trim() +" "+$(this).attr("data-id"))
    var replay= {
        answer: $("#answer"+$(this).attr("data-id") ).val().trim(),
        forumQuestionId: $(this).attr("data-id")
    }

    var id= $(this).attr("data-id")
    $.ajax({
        url: "/api/topics/"+id,
        type: "POST",
        data: replay
      }).then(
        function () {
            console.log("New question created!")
            location.reload();
        }
    )
})

$(".answerbtn").on("click", function (event) {
    event.preventDefault();
      alert($(this).attr("data-id") +" "+$("#answer"+$(this).attr("data-id") ).val())
    var newAnswer = {
        answer: $("#answer"+$(this).attr("data-id") ).val().trim(),
        forumQuestionId: $(this).attr("data-id")
    }

    console.log(newAnswer.forumQuestionId)
    console.log(newAnswer)
    $.ajax("/api/answer", {
        type: "POST",
        data: newAnswer
    }).then(
        function () {
            console.log("New answer created!")
            location.reload();
        }
    )
})
