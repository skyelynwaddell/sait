//Skye Waddell Node.JS | Day 8 - 13
const express   = require("express");
const app       = express();
const path      = require("path");
const mysql     = require("mysql");
const DBService = require("./database.js");

app.use(express.json());
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public/'));

const ip   = "localhost";
const port = 5000;

const userData = {
    username : "SkyeWaddell97",
    posts: 400,
    following: 300,
    followers: 100,
}

const postData = [
    {
    username : "SkyeWaddell97",
    content : "Hey whats going on people!",
    likes : 34,
    reposts: 123,
    comments: 192,
    },
]

const recommendedUsers = [
    { username: "Joh234" },
    { username: "AppleSmith223" },
]

// homepage / read
app.get("/", (request,response) => {
    const db = DBService.getDbServiceInstance();
    const postsPerPage = 25;

    const postDataPromise = db.getData("posts");
    const userDataPromise = db.getData("users");

    Promise.all([postDataPromise,userDataPromise])
    .then(([postData,userData]) => {
        response.render("index", {
            userData: userData,
            allUsers: userData,
            postData: postData.slice().reverse().splice(0,postsPerPage),
            recommendedUsers: userData
        })
    })
    // result
    // .then(data => response.render("index",
    // {
    //     data:data,
    //     userData:userData,
    //     postData:data.slice().reverse().splice(0,postsPerPage),
    //     recommendedUsers: recommendedUsers
    // }))
    .catch(err => console.log(err))
})

// signup page
app.get("/sign-up", (request,response) => {
    const db = DBService.getDbServiceInstance();
    const postsPerPage = 25;

    const postDataPromise = db.getData("posts");
    const userDataPromise = db.getData("users");

    Promise.all([postDataPromise,userDataPromise])
    .then(([postData,userData]) => {
        response.render("sign-up", {
            userData: userData,
            allUsers: userData,
            postData: postData.slice().reverse().splice(0,postsPerPage),
            recommendedUsers: userData
        })
    })
    .catch(err => console.log(err))
})
// login page
app.get("/login", (request,response) => {
    const db = DBService.getDbServiceInstance();
    const postsPerPage = 25;

    const postDataPromise = db.getData("posts");
    const userDataPromise = db.getData("users");

    Promise.all([postDataPromise,userDataPromise])
    .then(([postData,userData]) => {
        response.render("login", {
            userData: userData,
            allUsers: userData,
            postData: postData.slice().reverse().splice(0,postsPerPage),
            recommendedUsers: userData
        })
    })
    .catch(err => console.log(err))
})

//create
app.post("/create-post", (request,response) => {
    const username = "Skye98";
    const { content } = request.body;
    const db = DBService.getDbServiceInstance();

    const data = {
        username: username,
        content: content,
    }

    const result = db.insertNewPost(data);

    result
    .then(data => response.json({ success: true }))
    .catch(err => console.log(err)) 
 })

// read

// update

// delete

app.listen(port, () => {
    console.log(`Server Online http://${ip}:${port}/`)
})

