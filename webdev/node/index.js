const { createServer } = require('node:http');
const fs = require("fs");
const http = require("http");
const url = require("url");

const hostname = '127.0.0.1';
const port = 3123;

const greetingIndex = Math.ceil(Math.random() * 3) - 1;

const server = createServer((req, res) => {
  let parsedAddress = url.parse(req.url, true);
  let filePath = parsedAddress.pathname;
  let file = `.${filePath}`;
  let contentType = "text/html"; //default content type

  if (filePath.endsWith(".css")){
    file = `${filePath}`
    contentType = "text/css";
  } else {
    contentType = "text/html"
    
    switch(req.url){
      case "/":
      case "/home":
        file = "./src/index.html"
      break;

      case "/contact":
        file = "./src/contact.html"
      break;

      case "/about-us":
        file = "./src/about-us.html"
      break;

      case "/contact":
        file = "./src/contact.html"
      break;

      case "/404":
      default:
        file = "./src/404.html"
      break;
    }
  }

  fs.readFile(file, (err,data) => {
    if (err){
      res.writeHead(404, {"Content-Type": "text/html"});
      res.write("<h1>404 Page Not Found!</h1>")
      return res.end();
    }
    res.writeHead(200, { "Content-Type": "text/html"})
    res.write(data);
    return res.end();
  })
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
