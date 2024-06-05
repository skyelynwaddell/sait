//Skye Waddell Node.JS | Day 8 - 13 CPNT-262
//May 2024 👽

//If you're looking for the SQL connection, or queries 
//please refer to database.js

const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const DBService = require("./database.js");
const initPassport = require("./passport-config.js");

const ip = "localhost";
const port = 5098;
var db = DBService.getDbServiceInstance();
const postsPerPage = 25;

initPassport(passport, db.getUserByEmail);

app.set("view engine", "ejs");
app.use(flash());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/public/'));

app.use(session({
    secret: "h7K@s^4CF@d4$@#T%sdDSUF@3rk3!23v$#%",
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

//Authenticate that we are logged in, or else limit site exploration to the login / register page
const ensureAuthenticated = (req, res, next) => {

    //if we're logged in restrict access to the login/signup page
    if (req.isAuthenticated()) {
        if (req.path === "/login" || req.path === "/sign-up") {
            return res.redirect("/");
        }
        return next();
    }
    // If user is not authenticated and not on the login/register page, redirect to login page
    if (req.path !== "/login" && req.path !== "/sign-up") {
        return res.redirect("/login");
    }
    // If user is not authenticated but on the login/register page, or is already on the login page, proceed to the next middleware
    next();
};

// Apply the ensureAuthenticated middleware to all routes
app.use((req, res, next) => {
    ensureAuthenticated(req, res, next);
});

// homepage
app.get("/", (request, response) => {
    const db = DBService.getDbServiceInstance();

    const postDataPromise = db.getData("posts");
    const userDataPromise = db.getData("users");

    Promise.all([postDataPromise, userDataPromise])
        .then(([postData, userData]) => {

            let profileData = request.user;

            response.render("index", {
                userData: profileData,
                allUsers: userData,
                postData: postData.slice().reverse().splice(0, postsPerPage),
                recommendedUsers: userData
            })
            console.log(postData)

        })
        .catch(err => console.log(err))
})

// delete all users
app.get("/delete-users", (request, response) => {
    const db = DBService.getDbServiceInstance();

    const deleteUsers = db.deleteUsers();

    Promise.all([deleteUsers])
        .then(([deleteUsers]) => {


            response.send("Deleted all users!")

        })
        .catch(err => console.log(err))
})

// signup page
app.get("/sign-up", (request, response) => {
    const db = DBService.getDbServiceInstance();

    const postDataPromise = db.getData("posts");
    const userDataPromise = db.getData("users");

    Promise.all([postDataPromise, userDataPromise])
        .then(([postData, userData]) => {

            let profileData = request.user;

            response.render("sign-up", {
                userData: profileData,
                allUsers: userData,
                postData: postData.slice().reverse().splice(0, postsPerPage),
                recommendedUsers: userData
            })
        })
        .catch(err => console.log(err))
})

// login page
app.get("/login", (request, response) => {
    const db = DBService.getDbServiceInstance();

    const postDataPromise = db.getData("posts");
    const userDataPromise = db.getData("users");

    Promise.all([postDataPromise, userDataPromise])
        .then(([postData, userData]) => {

            let profileData = request.user;

            response.render("login", {
                userData: profileData,
                allUsers: userData,
                postData: postData.reverse().splice(0, postsPerPage),
                recommendedUsers: userData
            })
        })
        .catch(err => console.log(err))
})

//create new post
app.post("/create-post", (request, response) => {
    const username = request.user.username; // Get the username from request.user
    const { content } = request.body;
    const db = DBService.getDbServiceInstance();

    const isPostNotEmpty = (input) => {
        const notEmptyRegex = /^.+$/;
        return notEmptyRegex.test(input);
    }

    //verify that the post isn't empty before we submit it.
    if (isPostNotEmpty(content)) {
        const data = {
            username: username,
            content: content,
        }

        const result = db.insertNewPost(data);

        result
            .then(data => response.json({ success: true }))
            .catch(err => console.log(err))
    } else {
        console.log("Post content must not be empty...")
        return null;
    }
})

//delete post
app.post("/delete-post", (request, response) => {
    const db = DBService.getDbServiceInstance();
    const username = request.user.username; // Get the username from request.user

    let { postID } = request.body;

    let data = {
        id: postID,
        tableName: "posts",
        username: username,
    }

    const result = db.deletePost(data);

    result
        .then(data => response.json({ success: true }))
        .catch(err => console.log(err))

    //console.log(request.body);
})

//like/dislike post
app.post("/like-post", async (request, response) => {
    const db = DBService.getDbServiceInstance();
    const username = await request.user.username; // Get the username from request.user

    let { postID } = request.body;

    let data = {
        postID: postID,
        tableName: "posts",
        userColumn: "UserWhoLiked",
        value: "likes",
        username: username
    }

    const result = db.increasePost(data)

    result
        .then(data => response.json({ success: true }))
        .catch(err => console.log(err))

    //console.log(request.body);
})

//repost post
app.post("/repost", (request, response) => {
    const db = DBService.getDbServiceInstance();
    const username = request.user.username; // Get the username from request.user

    let { postID } = request.body;

    let data = {
        postID: postID,
        tableName: "posts",
        userColumn: "UserWhoReposted",
        value: "reposts",
        username: username
    }

    const result = db.increasePost(data)

    result
        .then(data => response.json({ success: true }))
        .catch(err => console.log(err))

    //console.log(request.body);
})

//sign up
app.post("/sign-up", async (request, response) => {
    try {
        console.log(request.body)
        const { email, username, password, password_confirm } = request.body;

        if (password !== password_confirm) {
            return response.send("<h1>Password's do not match!</h1>")
        }

        const hashedPassword = await bcrypt.hash(password, 10) //salt the password x10
        const db = DBService.getDbServiceInstance();

        let userData = {
            email: email,
            username: username,
            password: hashedPassword,
        }

        const result = await db.createNewUser(userData, response).catch(err => console.log(err));

    }
    catch (err) {
        console.log(err)
    }
})

//contact page
app.get("/contact", (request, response) => {
    const db = DBService.getDbServiceInstance();

    const userDataPromise = db.getData("users");

    Promise.all([userDataPromise])
        .then(([userData]) => {

            let profileData = request.user;

            response.render("contact", {
                userData: profileData,
                allUsers: userData,
                recommendedUsers: userData
            })
        })
        .catch(err => console.log(err))
})

//submit contact form
app.post("/contact", async (req, res) => {
    try{
        console.log(req.body)
        const { contact } = req.body;
        console.log(contact)
        
        const db = DBService.getDbServiceInstance();
        await db.contactSubmit(contact,res);

        res.redirect("/thankyou");
    }catch(err){
        console.log(err);
    }
})

//thank you page
app.get("/thankyou", (request, response) => {
    const db = DBService.getDbServiceInstance();

    const userDataPromise = db.getData("users");

    Promise.all([userDataPromise])
        .then(([userData]) => {

            let profileData = request.user;

            response.render("thankyou", {
                userData: profileData,
                allUsers: userData,
                recommendedUsers: userData
            })
        })
        .catch(err => console.log(err))
})

//about us page
app.get("/about-us", (request, response) => {
    const db = DBService.getDbServiceInstance();

    const userDataPromise = db.getData("users");

    Promise.all([userDataPromise])
        .then(([userData]) => {

            let profileData = request.user;

            response.render("about-us", {
                userData: profileData,
                allUsers: userData,
                recommendedUsers: userData
            })
        })
        .catch(err => console.log(err))
})

//user login
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
}))

//user logout
app.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

//404 middleware
app.use((request, response, next) => {
    const db = DBService.getDbServiceInstance();

    const userDataPromise = db.getData("users");

    Promise.all([userDataPromise])
        .then(([userData]) => {

            let profileData = request.user;

            response.status(404).render("404", {
                userData: profileData,
                allUsers: userData,
                recommendedUsers: userData
            })
        })
        .catch(err => console.log(err))
})

app.listen(port, () => {
    console.log(`Server Online http://${ip}:${port}/`)
})