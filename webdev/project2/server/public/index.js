document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/")
    .then(request => response.json())
    .then(data => console.log(data));
})

const postButton = document.querySelector("#addPostButton");

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
    .then(data => insertRowIntoTable(data['data']))
    .then(location.reload(true))
}

function insertRowIntoTable(data){
}

function loadPage(pageName){
    window.location.href=pageName;
}