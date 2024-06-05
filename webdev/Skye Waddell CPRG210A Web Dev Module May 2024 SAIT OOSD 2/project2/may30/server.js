const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const mysql = require("mysql");
const session = require("express-session");
const DBService = require("./database.js");

const ip = "localhost";
const port = 1231;

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/public/'));

//express-session middleware
app.use(session({
    secret: 'helloworld',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

//homepage
app.get("/", async (req,res) => {
    try{
        req.session.views = req.session.views >= 1 ? req.session.views++ : 1;

        const db = DBService.getDbServiceInstance();
        const users = await db.getData("users");

        res.render("index", { views: req.session.views, users });
    } 
    catch(err){ console.log(err); }
})

//login
app.get("/login", (req,res) => {
    res.render("login")
})

//register
app.get("/register", (req,res) => {
    res.render("register")
})

//register page
app.post("/register", async (req,res) => {
    const { email, username, password1, password2 } = req.body;
    console.log(req.body);

    //verify both passwords match from the frontend
    if (password1 !== password2) {
        console.log("passwords do not match")
        return null;
    }

    //register query
    const contactquery = await new Promise((resolve,reject) => {
        const query = "INSERT INTO users (email,username,password) VALUES (?,?,?);";

        connection.query(query, [email,username,password1] , (err,result) => {
            if (err) { 
                res.send("Error sending comment.");
                return reject(new Error(err.message)); 
            }
            resolve(result.insertId);

            //on register success redirect to thankyou page
            res.redirect("/thankyou")
        })
    })
})

//thank you page
app.get("/thankyou", (req,res) => {
    res.render("thankyou");
})

//available user post request
app.post("/availableUser", (req,res) => {
    const { username } = req.body;
    console.log(username);

})

//login page
app.post("/login", (req,res) => {
    const { email, password1 } = req.body;
    console.log(req.body);
})

//404 middleware
app.use((req,res,next) => {
    res.render("404");
})

//start the server
app.listen(port,() => {
    console.log(`server started http://${ip}:${port}`);
})
