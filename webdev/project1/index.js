// Created by Skye Waddell
// May 2024 | OOSD - Web Development | Travel Project
// CRPG-210-A
const weakText   = "Password Strength: WEAK ⛔";
const shortText  = "Password Strength: SHORT ✅";
const strongText = "Password Strength: STRONG ✅";

const imageArray = [
    { name : "https://media.gettyimages.com/id/182175143/photo/photo-of-some-white-whispy-clouds-and-blue-sky-cloudscape.jpg?s=612x612&w=0&k=20&c=4pM1uET260cVlZooulBBBjST9Cx-uzKwBNNYyn3AN_k=",                                  title: "Image #1", description:"Lorem, ipsum dolor sit amet consectetur adipisicing elit.", url: "https://google.com/" },
    { name : "https://media.gettyimages.com/id/1297349747/photo/hot-air-balloons-flying-over-the-botan-canyon-in-turkey.jpg?s=612x612&w=0&k=20&c=kt8-RRzCDunpxgKFMBBjZ6jSteetNhhSxHZFvHQ0hNU=",                                   title: "Image #2", description:"Lorem, ipsum dolor sit amet consectetur adipisicing elit.", url: "http://amazon.com/" },
    { name : "https://media.gettyimages.com/id/1413299539/photo/male-tourist-looking-at-arrival-and-departure-board-at-kuala-lumpur-international-airport.jpg?s=612x612&w=0&k=20&c=2XC49sUve2fV4hDBzVQjZfM4OudujBX5jVUja65QngM=", title: "Image #3", description:"Lorem, ipsum dolor sit amet consectetur adipisicing elit.", url: "http://ibm.com/" },
    { name : "https://media.gettyimages.com/id/1180055107/photo/woman-in-a-gondola.jpg?s=612x612&w=0&k=20&c=4hRqNRkoKZN1LtNHg30VbSY50pqCO3o9JTzrikqtbfw=",                                                                        title: "Image #4", description:"Lorem, ipsum dolor sit amet consectetur adipisicing elit.", url: "http://apple.com/" },
    { name : "https://media.gettyimages.com/id/1094338162/photo/summers-a-time-for-adventure.jpg?s=612x612&w=0&k=20&c=WBA3fgSawaK60gnorXxSvReblySZ4m2ej7U9H5AP8Kc=",                                                              title: "Image #5", description:"Lorem, ipsum dolor sit amet consectetur adipisicing elit.", url: "http://bing.com/" },
]

fetch('./contact.html')
.then(response => response.text())
.then(() => {
    const agents = [
        { name: "John Doh",    email: "john.doh@email.com",    phone: "(123) 123-1234" },
        { name: "Alex Joe",    email: "alex.joe@email.com",    phone: "(123) 123-1234" },
        { name: "Mc Apple",    email: "mc.apple@email.com",    phone: "(123) 123-1234" },
        { name: "Hello World", email: "hello.world@email.com", phone: "(123) 123-1234" },
        { name: "Jenny Lenny", email: "jenny.lenny@email.com", phone: "(123) 123-1234" },
        { name: "Adam Color",  email: "adam.color@email.com",  phone: "(123) 123-1234" },
    ]

    for (let i in agents) {
        document.getElementById('agents').innerHTML +=
        `
        <div class="agents">
            <th class="bubble agentBubble" id="agents">

                <!-- Agent Name -->
                <p class="agentName">${agents[i].name}</p>

                <!-- Email Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                </svg>
                ${agents[i].email}
                
                <br>
                
                <!-- Phone Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                </svg>
                ${agents[i].phone}

            </th>
        </div>
        `;
    }
})
.catch(error => null,null);

// Fetch and insert the content of input types into input-types.html
fetch('./input-types.html')
.then(response => response.text())
.then(() => {

    const inputTypes = [
        { type: "button" },
        { type: "range" },
        { type: "email" },
        { type: "week" },
        { type: "url" },
        { type: "radio" },
        { type: "checkbox" },
        { type: "text" },
        { type: "password" },
        { type: "search" },
        { type: "date" },
        { type: "submit" },
        { type: "color" },
        { type: "file" },
        { type: "datetime-local" },
        { type: "email" },
        { type: "image" },
    ]

    for (let i in inputTypes) {
        let type = inputTypes[i].type;
        document.getElementById('inputTypes').innerHTML +=
            `
            <label for="${type}">${type}</label>
            <input 
                class="inputBoxes" 
                value = "${type}"
                type  = "${type}"
                name  = "${type}"
            > 
            </input>
            `;
    }
})
.catch(error => null,null);

// Fetch and insert the content of navbar.html
fetch('./utils/navbar.html')
.then(response => response.text())
.then(html => {
    document.getElementById('navbarContainer').innerHTML = html;
})
.catch(error => null,null);

// Fetch and insert the content of banner.html
fetch('./utils/banner.html')
.then(response => response.text())
.then(html => {
    document.getElementById('banner').innerHTML = html;
})
.catch(error => null,null);

// Fetch and insert the content of footer.html
fetch('./utils/footer.html')
.then(response => response.text())
.then(html => {
    document.getElementById('footer').innerHTML = html;
})
.catch(error => null,null);

//load image array on home page (day 5 excercise)
fetch('./')
.then(response => response.text())
.then(() => {
    for (let i in imageArray){
        let table = document.getElementById('imageArrayTable');
        let row   = document.createElement('tr');
        let img   = document.createElement('td');

        img.innerHTML = `<img class="imageArrayPictures" src="${imageArray[i].name}" onclick="openAndCloseWindow('${imageArray[i].url}');">`;
        row.appendChild(img);

        let text = document.createElement('td');
        text.innerHTML =
        `
        <div class="bubble3">
            <a onclick="openAndCloseWindow('${imageArray[i].url}');"><h3 class="image-text-title">${imageArray[i].title}</h3></a>
            <h4 class="image-text-description">${imageArray[i].description}</h4>
        </div>
        `;
        row.appendChild(text);
        table.appendChild(row);
    }
}).catch(error => null,null);

//bonus script of bouncing ball for excercise wed may 22 2024
document.addEventListener('DOMContentLoaded', () => {
fetch('./')
.then(response => response.text())
.then(() => {

    let canvas = document.getElementById('canvasBallWindow');
    let ctx    = canvas.getContext('2d');
    let w      = canvas.width;
    let h      = canvas.height;

    let x = w / 2;
    let y = h / 2;

    let dirx = +2;
    let diry = -2;

    function drawBall(){
        ctx.clearRect(0,0,w,h);
        ctx.beginPath();
        ctx.arc(x,y,20,0,Math.PI * 2);
        ctx.fillStyle = "lime";
        ctx.fill();
        ctx.closePath();
    }

    function updateBallPosition(){
        let gap = 20;

        x += dirx;
        y += diry;

        if (x + dirx > w - gap || x + dirx < gap){
            dirx = -dirx;
        }
        if (y + diry > h - gap || y + diry < gap){
            diry = -diry;
        }
    }

    function updateBall(){
        updateBallPosition();
        drawBall();
        requestAnimationFrame(updateBall);
    }
    
    updateBall();

    }).catch(error => null, null);
})

//sign up button onclick func on register page
function registerButton() {
    let response = confirm("Are you sure you want to sign up?");
    let pass1 = document.getElementById("registerPassword1").value;
    let pass2 = document.getElementById("registerPassword2").value;

    if (response) {
        if (pass1 !== pass2) {
            alert("Passwords do not match.");
            return false;
        }

        alert("Sign up success.");
        return true;
    }
    return false;
}

//login button onclick func on login page
function loginButton() {
    alert("Login success.");
    return true;
}

//feedback submit button on contact page
function feedbackSubmit(){
    let response = confirm("Are you sure you want to send your message?");
    
    if (response) {
        alert("Feedback sent.");
        return true;
    }
    return false;
}

//reset button onlick func on register page
function resetButton() {
    let text  = weakText;
    let response = confirm("Are you sure you want to clear all fields?");

    if (response) {
        document.getElementById("passwordMatch").innerHTML = "Password must not be empty."
        document.getElementById("strongPassword").innerHTML = text;
        return true;
    }
    return false;
}

//Reset feedback button on contact page
function resetFeedbackButton(){
    return confirm("Are you sure you want to clear the field?");
}

//clamp value to min/max value
function clamp(value, min, max) {
    value = Math.max(min, Math.min(max, value));
    return value;
}

//function that controls the meter amount on the inputs page
function increasePercent(increase, percentIncrease) {
    percent += increase ? percentIncrease : -percentIncrease;
    percent = clamp(percent, 0, 1);

    let roundedPercent = Math.round(percent * 100);
    let meter = document.getElementById("meter");

    meter.value = percent;
    document.getElementById('meter-text').innerHTML =
        `${roundedPercent}%`;
}

function displayPicture(txt){
    for (let i in imageArray){
        if (imageArray[i].title === txt){

            let index = imageArray[i];
            let message = `${index.name} ${index.title} ${index.description}`;

            console.log(message);
            alert(message);
        }
    }
}

function checkPasswordStrength(){
    let field = document.getElementById("registerPassword1");
    let passwordStrength = document.getElementById("strongPassword");
    
    let text  = weakText;

    if (field.value.length <= 4){
        text = weakText;
    }
    else if (field.value.length <= 10){
        text = shortText;
    }
    else {
        text = strongText;
    }

    passwordStrength.innerHTML = text;
}

function matchPassword(){
    let pass1 = document.getElementById("registerPassword1").value;
    let pass2 = document.getElementById("registerPassword2").value;

    if (pass1 !== pass2){
        document.getElementById("passwordMatch").innerHTML = "Passwords DON'T match! ⛔";
    }
    else if (pass1.length <= 0){
            document.getElementById("passwordMatch").innerHTML = "Password must not be empty.";
    } else {
        document.getElementById("passwordMatch").innerHTML = "Passwords match! ✅";
    }
}

function openAndCloseWindow(_url){
    let newWindow = window.open('', '', 'width=640, height=480');
    let newWindowDocument = newWindow.document;

    //create new window which will then redirect to the image's urlS
    newWindow.onload = function(){
        redirectWindow(newWindowDocument, _url);
    }

    //close window automatically after a duration of time
    setTimeout(() => {
        newWindow.close();
        window.open(_url, '', 'width=640, height=480');
    }, 2000)
}

//redirect window function
function redirectWindow(newWindowDocument, _url){
    let paragraph = newWindowDocument.createElement("p");
    let anchor = newWindowDocument.createElement("a");
    let textNode  = newWindowDocument.createTextNode("This page will soon close. If not redirected automatically, ");

    anchor.href = _url;
    anchor.textContent = "click here"

    paragraph.appendChild(textNode);
    paragraph.appendChild(anchor);
    newWindowDocument.body.appendChild(paragraph);
}

