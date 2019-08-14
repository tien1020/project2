
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
        password:password
        
    }
    data = JSON.stringify(newUser)
    console.log(newUser)
    saveUser(data).then(function (res) {
        console.log("new user data saved");
    })
});

function saveUser(newUser) {
    alert(newUser)
    return $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        type: "POST",
        url: "/api/student",
        data: newUser
    });
}

// "development": {
//     "username": "root",
//     "password": "hani",
//     "database": "philit",
//     "host": "localhost",
//     "dialect": "mysql"