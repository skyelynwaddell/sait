//CPNT-262 Skye Waddell Node JS Day 8 to 13
//May 2024

const express   = require("express");
const app       = express();
const path      = require("path");
const mysql     = require("mysql");

const myModule  = require("./greetings.js")

const ip = "localhost";
const port = 5234;

app.set("view engine","ejs");
app.use(express.static(__dirname + '/public/'));

// Homepage
app.get("/", (request,response) => {

    let result = "Data being loaded from backend"

    response.render("index", {
        data: result
    })
})

// Greeting
app.get("/greeting", (request,response) => {

    let greeting = myModule.Greeting();

    switch(greeting){
        case "Good Morning!":
            response.render("morning", {
                greeting: greeting
            })
        break;

        case "Good Evening!":
            response.render("evening", {
                greeting: greeting
            })
        break;

        case "Good Afternoon!":
            response.render("afternoon", {
                greeting: greeting
            })
        break;
    }
})

//Simple Post Request
app.post("/test", (request,response) => {
    response.send("Post Success!")
})

// Error 404 Page Not Found
app.use((request,response,next) => {
    response.render("404", {
        success: false
    })
})

app.listen(port, () => {
    console.log(`app running on http://${ip}:${port}`)
})