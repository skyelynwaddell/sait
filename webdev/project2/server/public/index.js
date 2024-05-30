//On load Read Data 
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/")
    .then(request => response.json())
    .then(data => console.log(data));
})

//Select all the buttons that can be used for post requests
const postButton       = document.querySelector("#addPostButton");
const signupButton     = document.querySelector("#signupButton");
const loginButton      = document.querySelector("#loginButton");
const deletePostButton = document.querySelectorAll(".btnDelete")
const likePostButton   = document.querySelectorAll(".postLikes")
const repostButton     = document.querySelectorAll(".postReposts")
const logoutButton     = document.getElementById("logoutButton")


function resetPostText(){
    document.getElementById("newPostText").placeholder = "Write new post..."
}

//Create a new post
postButton.onclick = function(){
    let content = document.getElementById("newPostText").value;

    if (content.length <= 0) {
        document.getElementById("newPostText").placeholder = "Your post must not be empty..."
        return;
    }

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

//Logout
logoutButton.onclick = function(){
   const form = document.createElement("form");
   form.method = "POST";
   form.action = "/logout";
   document.body.appendChild(form);
   form.submit();
}

//Like a post
likePostButton.forEach((button, index) => {
    button.onclick = function(){

        let postID = button.dataset.postId;

        fetch(`http://localhost:5000/like-post`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                postID: postID
            })
        })
        .then(response => response.json())
        .then(data => {
            insertRowIntoTable(data['data']);
            location.reload(true);
        })
        .catch(err => console.log(err))
    }
})

//Repost a post
repostButton.forEach((button, index) => {
    button.onclick = function(){

        let postID = button.dataset.postId;

        fetch(`http://localhost:5000/repost`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                postID: postID
            })
        })
        .then(response => response.json())
        .then(data => {
            insertRowIntoTable(data['data']);
            location.reload(true);
        })
        .catch(err => console.log(err))
    }
})

//Delete a post
deletePostButton.forEach((button, index) => {
    button.onclick = function(){

        let postID = button.dataset.postId;

        fetch("http://localhost:5000/delete-post", {
            headers : {
                "Content-Type" : "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                postID: postID,
            })
        })
        .then(response => response.json())
        .then(data => {
            insertRowIntoTable(data['data']);
            location.reload(true);
        })
        .catch(err => console.log(err))
    } 
})

//User sign up
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

//User sign up
loginButton.onclick = function(){
    let email = document.querySelector("#inputEmail").value
    let password = document.querySelector("#inputPassword1").value
    
    document.getElementById("inputEmail").value     = "";
    document.getElementById("inputPassword1").value = "";

    fetch("http://localhost:5000/login", {
        headers : {
            'Content-Type': "application/json"
        },
        method: "POST",
        body: JSON.stringify({ 
            email: email,
            password: password,
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