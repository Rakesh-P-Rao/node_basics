/*
let users = function (name) {
    return name;
};

console.log(users("shashi"));
console.log("i am nodejs");

//// to execute node :- node filename ,here node server.js

//// also nodejs is a 'global object' not 'window object'
console.dir(global);



//// Nodejs Modules 
console.log(module);
// core modules   :- built in modules provided by nodeApi no need to install
// third party modules   :- npm install (modulename)
// local modules  :- use require and module.exports to access other local files,eg :- ...
let { fullstack, java, js } = require("./fullstack");
console.log(fullstack, java, js);



//// loading modules types
const os = require("os");  // commonjs loading module
// import os from "os"; // ECMAscript loading module

let arch = os.arch();
let freememory = os.freemem();
console.log(arch,freememory);
let x = os.homedir();
let x1 = os.hostname();
let x2 = os.platform();
let x3 = os.release();
let x4 = os.tmpdir();
let x5 = os.totalmem();
let x6 = os.type();
let x7 = os.userInfo();
console.log(x, x1, x2, x3, x4, x5, x6, x7);



let Javascript = require("./fullstack");
console.log(Javascript.Users("asdj", 20, "Capgemini", 50000));
console.log(Javascript.languages("java", "nodejs", "html", "css", "Reactjs", "javascript"));



////how to handle files in nodejs (file handling)
// fs or file system core module
let fs = require("fs"); 
console.dir(fs);


////
//synchronous read file
let readDataSync = fs.readFileSync("fullstack.txt");   
console.log(readDataSync.toString());
let after_readSyncData = "i am executing after readData variable";
console.log(after_readSyncData);

// asynchronous read file, use callback function
fs.readFile("fullstack.txt", "utf8", (err, data) => {
    if (err) throw err;
    else console.log(data);
});
let after_readAsyncData = "i am executing before data variable";
console.log(after_readAsyncData);


///
// synchronously write and read data 
let ReadTextSync = fs.readFileSync("fullstack.txt", "utf8");
let WriteFileSync = fs.writeFileSync("dummyText.txt", ReadTextSync);

// asynchronously write and read data
fs.readFile("fullstack.txt", "utf-8", (err, data) => {
    if (err) throw err;
    fs.writeFile("data.txt", data, (err, value) => {
        if (err) throw err;
        console.log(value);
    });
});


////
// deleting file synchronously
//fs.unlinkSync("dummyText.txt");

// deleting file asynchronously
fs.unlink("data.txt", (err) => {
    if (err) throw err;
    console.log("successfully file deleted");
});


////
// create directory synchronously
fs.mkdirSync("fullstack");
// remove directory synchronously
fs.rmdirSync("fullstack");


// create directory asynchronously
fs.mkdir("fullstack", (err) => {
    if (err) throw err;
    console.log("directory created....");
    //read file asynchronously 
    fs.readFile("index.html", "utf-8", (err, data) => {
        //write a file inside fullstack directory
        if (err) throw err;
        fs.writeFile("fullstack/stack.html", data, (err) => {
            if (err) throw err;
            console.log("successfully created directory and file and even written data");
        });
    });
});

// remove directory asynchronously
fs.unlink("fullstack/stack.html", (err) => {
    if (err) throw err;
    console.log("we deleted file now ready to delete directory...");
    fs.rmdir("fullstack", (err) => {
        if (err) throw err;
        console.log("successfully removed");
    });
});




//// buffer and stream on fs
// buffer means raw data or small chunk of data 
//var buffer = require("buffer");
let data = Buffer.from("shashi");
console.log(data);


//// 4 types of streams
// ReadableStream
// WritableStream
// DuplexStream
// TransformStream


// ReadableStream
let readStream = fs.createReadStream(__dirname+"/index.html","utf8");
readStream.on("data", (chunk) => {
    console.log(chunk);
}); // on is an event
//console.log(readStream);
console.log(__dirname); // directory name


// WritableStream
let readStream = fs.createReadStream(__dirname + "/index.html", "utf8");
let writeStream = fs.createWriteStream(__dirname + "/fullstack.html", "utf8");
//console.log(writeStream);

readStream.on("data", (chunk) => {
    writeStream.write(chunk, (err) => {
        if (err) throw err;
        console.log("Successfully written data from readabl stream");
    });
});


// DuplexStream  => ""pipes"""  (both read and write)
let readStream = fs.createReadStream(__dirname + "/index.html", "utf8");
let writeStream = fs.createWriteStream(__dirname + "/flipkart.html", "utf8");
readStream.pipe(writeStream);



//// backend web app in nodejs or any other web application needs server like ,....
//....web servers => nginx, apache web server, apache tomcat server, jboss 
// http (hypertext transfer protocol) => web server (handling web server or communicating client ad server request and response)
// ftp (file transfer protocol) = file server handling files on server uploading and downloading 
// smtp = handling emails simple mail transfer protocol


console.log(http);
// http provide method and status like 200(ok),400(bad request),404(not found),500(internal server error),502(bad getaway),503(service unavailable) etc

// ** nodejs we can create own server, we used, localhost: 3000 => react , localhost:5500 => html,css,javascript nodejs


//// creating a server
// we need to create a server to handle client request and connecting to databse
// first import http module
let http = require("http");
let server = http.createServer((req, res) => {
    // header part , set http status code and contenttype in header
    res.writeHead(200, {
        "Content-Type": "text/html",
    });
    res.end(`
    <h1> this object is coming from http response</h1>
    `);
    console.log(req);
    console.log(res);
});
let port = 2700;
server.listen(port, (err) => {
    if (err) throw err;
    console.log("server is running on port number" + port);
});

// OR
//let http = require("http");
 http.createServer((req, res) => {
    // header part , set http status code and contenttype in header
    res.writeHead(200, {
        "Content-Type": "text/html",
    });
    res.end(`
    <h1> this object is coming from http response</h1>
    `);
    console.log(req);
    console.log(res);
})
.listen(2700, (err) => {
    if (err) throw err;
    console.log("server is running on port number 2700");
});

// OR
let http = require("http");
http.createServer((req, res) => {
    res
        .writeHead(200, { "Content-Type": "text/html" })
        .end(`<h1>this object is coming from http response</h1>`);
}).listen(2700);



//// serve html to server
let http = require("http");
let fs = require("fs");
let server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    //stream 
    let ServeHtml = fs.createReadStream(__dirname + "/index.html", "utf8");
    ServeHtml.pipe(res);
});
server.listen(2700, (err) => {
    if (err) throw err;
    console.log("server is running on port number 2700");
});


// serve api to server
let http = require("http");
let server = http.createServer((req, res) => {
    // create basic RESTApi , contenttype should be application/json
    res.writeHead(200, { "Content-Type": "application/json" });
    let users = [
      {
        name: "ghjh",
        age: "20",
        company: "testyantra",
        salary: 20000,
        designation: "node developer",
        city: "mandya",
        doj: new Date(),
      },
      {
        name: "qwejh",
        age: "22",
        company: "testyantra",
        salary: 30000,
        designation: "node developer",
        city: "mysore",
        doj: new Date(),
      },
    ];
    res.end(JSON.stringify(users));
});
server.listen(2700, (err) => {
  if (err) throw err;
  console.log("server is running on port number 2700");
});


//// routing 
let http = require("http");
let fs = require("fs");
let server = http.createServer((req, res) => {
  // nodejs web application routing....
    console.log(req.url);
    if (req.url === "/" || req.url === "/home") {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream(__dirname + "/index.html", "utf8").pipe(res);
    } else if (req.url === "/login") {
                res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream(__dirname + "/login.html", "utf8").pipe(res);
    } else if (req.url === "/api") {
        res.writeHead(200, { "Content-Type": "application/json" });
        let users = [
          {
            name: "ghjh",
            age: "20",
            company: "testyantra",
            salary: 20000,
            designation: "node developer",
            city: "mandya",
          },
          {
            name: "qwejh",
            age: "22",
            company: "testyantra",
            salary: 30000,
            designation: "node developer",
            city: "mysore",
          },
        ];
        res.end(JSON.stringify(users));
    } else if (req.url === "/contact") {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream(__dirname + "/contact.html", "utf8").pipe(res);
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        fs.createReadStream(__dirname + "/pagenotfound.html","utf8").pipe(res);
    }
});

let port = 2700;
server.listen(port, (err) => {
  if (err) throw err;
    console.log("server is running on port number " + port);
});



//// to create any node app we need mandatorily (" package.json ") file
// creating package.json file 
// 1)npm init => give pacakage name => give description => give entry point or let it be index.js => give authorname => agree license => type yes and press enter
// also install => npm install node-mailer --save => will create dependencies in package.json
//// to load third-party module
let mailer = require("nodemailer");
//console.log(mailer);

// send mails from nodejs
let sendMail = mailer.createTransport({
    service: "gmail",
    auth: {
        user: "rakesh.rao278698@gmail.com",
        pass: "*************************************************",
    },
});

let MailOptions = {
  from: "rakesh.rao278698@gmail.com",
  to: "usharajesh771@gmail.com",
  subject: "we are testing sending emails",
  html: `
  <h1 style="color:red">NodeMailer</h1>
  <p style="color:"#999"> Usha understand with open ears what ur son says </p>
    `,
};

sendMail.sendMail(MailOptions, (err) => {
    if (err) throw err;
    console.log("sucessfully mail sent");
});



*/
//
const http = require("http");
const fs = require("fs");
const nodemailer = require("nodemailer");

let server = http.createServer((req, res) => {
    if (req.method === "post" || req.url === "/sendEmail") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
            <form method="post" action="/sendEmail">
    <input type="text" placeholder="username" required>
    <input type="email" placeholder="email" required>
    <input type="text" placeholder="phone number" required>
    <button>Contact Us</button>
    </form>
        `);
    };
});

let port = 4000;
server.listen(port, (err) => {
    if (err) throw err;
    console.log("server is running on port number " + port);
});



