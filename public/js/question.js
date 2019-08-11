$(".create-question").on("submit", function (event) {
    event.preventDefault();

    var newQuestion = {
        studentId: $("#signup-student-id").val().trim(),
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

$(".answerbtn").on("click", function (event) {
    event.preventDefault();
      alert($(this).attr("data-id") +" "+$("#answer"+$(this).attr("data-id") ).val())
    var newAnswer = {
        answer: $("#answer"+$(this).attr("data-id") ).val().trim(),
        forumQuestionId: $(this).attr("data-id")
    }

    console.log(newAnswer.qid)
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
