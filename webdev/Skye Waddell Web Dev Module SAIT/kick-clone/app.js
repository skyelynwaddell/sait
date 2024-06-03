//Skye Waddell Node.JS | Day 8 - 13
const express = require("express");
const app     = express();
const path    = require("path");

const ip   = "localhost";
const port = "5000";

app.use('/', express.static(path.join(__dirname + "/public")));
app.use('/contact', express.static(path.join(__dirname + "/public/contact.html")));
app.use('/about-us', express.static(path.join(__dirname + "/public/about-us.html")));

app.use((req, res) => {
    res.status(404);
    //res.send(`<h1>Error 404: Page Not Found!</h1>`);
    res.sendFile(path.join(__dirname + "/public/404.html"));
})

app.listen(port, () => {
    console.log(`Server Online http://${ip}:${port}/`)
})