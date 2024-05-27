const builtIn = require("module").builtinModules;
const fs      = require("fs");

const { createServer } = require('http');

var ip = "localhost";
var port = 3234;

let address = `http://${ip}:${port}?user=hello&date=3/23/24`
const myURL = new URL(address);
console.log(myURL.hostname);
console.log(myURL.port);
console.log(myURL.host);
console.log(myURL.searchParams);

const server = createServer((req, res) => {
  
  fs.readFile("./public/index.html", (err, data) => {

    if (err) { 
      res.statusCode = 404; 
      console.log(err); 
      return; 
    }

    let name = "Bob"

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    //res.write(data);
    res.write(`<h2> What's up? ${name} </h2>`)
    res.end();

  })
  
});

server.listen(port, ip, () => {
  console.log(`Server running on http://${ip}:${port}/`);
});
