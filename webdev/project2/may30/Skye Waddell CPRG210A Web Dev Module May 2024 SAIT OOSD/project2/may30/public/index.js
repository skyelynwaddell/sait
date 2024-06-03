function focusUsername(){
    let username = document.getElementById("username").value;
    document.getElementById("availableText").style.display = "block";

    if (username.length <= 0) {
        console.log("username must not be empty");
        document.getElementById("availableText").innerText = `Username must not be empty!`;

        return null;
    }

    fetch("/availableUser", {
        method: "POST",
        body: JSON.stringify({
            username
        }),
        headers: {
            "Content-type" : "application/json"
        }
    })

}

function blurUsername(){
    document.getElementById("availableText").style.display = "none";
}