document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/")
    .then(request => response.json())
    .then(data => console.log(data));
})

const postButton   = document.querySelector("#addPostButton");
const signupButton = document.querySelector("#signupButton")
const loginButton  = document.querySelector("#loginButton")

postButton.onclick = function(){
    let content = document.getElementById("newPostText").value;
    document.getElementById("newPostText").value = "";

    fetch("http://localhost:5000/create-post", {
        headers : {
            'Content-Type': "application/json"
        },
        method: "POST",
        body: JSON.stringify({ content:content })
        
    })
    .then(response => response.json())
    .then(data => {
        insertRowIntoTable(data['data']);
        location.reload(true);
    })
    .catch(err => console.log(err))
}

signupButton.onclick = function(){
    let email = document.querySelector("#inputEmail").value
    let username = document.querySelector("#inputUsername").value
    let password = document.querySelector("#inputPassword1").value
    let password_confirm = document.querySelector("#inputPassword2").value
    
    document.getElementById("inputEmail").value     = "";
    document.getElementById("inputUsername").value  = "";
    document.getElementById("inputPassword1").value = "";
    document.getElementById("inputPassword2").value = "";

    fetch("http://localhost:5000/sign-up", {
        headers : {
            'Content-Type': "application/json"
        },
        method: "POST",
        body: JSON.stringify({ 
            email: email,
            username: username,
            password: password,
            password_confirm: password_confirm,
        })
    })
    .then(response => response.json())
    .then(data => {
        insertRowIntoTable(data['data']);
        location.reload(true);
    })
    .catch(err => console.log(err))
}

function insertRowIntoTable(data){
}

function loadPage(pageName){
    window.location.href = pageName;
}