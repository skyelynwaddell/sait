//Skye Waddell 
//Lets try some File System built in module

const fs = require("fs");

fs.open("newFile2.txt", err => {
    console.log(err);
    return err;
})

fs.appendFile("newFile.txt", "Hello Again ", err =>{
    console.log(err);
    return err;
})

fs.writeFile("newFile3.txt", "Hello", err => {
    console.log(err);
    return err;
})

fs.mkdir("Hello", err => {
    console.log(err);
})

fs.unlink("./newFile3.txt", err => {
    console.log(err);
    return err;
})

fs.writeFile("./Hello/Hello.txt", "", err => {
    console.log(err);
})

fs.rename("./hello/hello.txt", "./hello/helloWorld.txt", err => {
    console.log(err);
    return err;
})