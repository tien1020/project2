
$(document).on("click", "#signupBtn", function (event) {
    console.log("user clicked submit")
    event.preventDefault();
    firstName = $("#signup-firstName").val().trim();
    lastName = $("#signup-lastName").val().trim();
    birthday = $("#signup-date").val().trim();
    gender = $("#signup-gender").val().trim();
    email = $("#signup-email").val().trim();
    username = $("#signup-userName").val().trim();
    password = $("#signup-password").val().trim();

    newUser = {
        firstname: firstName,
        lastname: lastName,
        birth_date: birthday,
        gender: gender,
        email: email,
        username: username,
        password:password,
        role:"student"
    }
    data = JSON.stringify(newUser)
    
    saveUser(data).then(function (res) {
        if(res=="error"){
            alert("Try Again Please")
        }
        else{
            window.location.replace("/thanks.html");
        }
});

function saveUser(newUser) {
   
    return $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        type: "POST",
        url: "/api/student",
        data: newUser
    });
}
})