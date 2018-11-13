/*
 * Write your server code in this file.  Don't forget to add your name and
 * @oregonstate.edu email address below.
 *
 * name: Zach Bishop
 * email: bishopz@oregonstate.edu
 */

//Stores all files so they do not need to be repeatedly read in from disk
var indexHtml;
var indexJs;
var styleCss;
var bennyJpg;
var html404;

//Request handler
function requestHandler(req, res) {
  console.log("==Request received");
  console.log(" - url:", req.url);
  console.log(" - method:", req.method);

  var fs = require('fs');

  //Only search for pages to return if the method is a get method
  if(req.method == "GET") {
    if(req.url == "/index.html" || req.url == "/") {
      //Set status code and header
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');

      //Get the content to be sent back to the client if it has not already been loaded in from disk
      if (!indexHtml) {
        console.log(" - reading in file from disk");
        indexHtml = fs.readFileSync('public/index.html', 'utf-8');
      }

      //Fill in the body with the content
      res.write(indexHtml);
    }
    else if(req.url == "/index.js") {
      //Set status code and header
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/javascript');

      //Get the content to be sent back to the client if it has not already been loaded in from disk
      if (!indexJs) {
        console.log(" - reading in file from disk");
        indexJs = fs.readFileSync('public/index.js', 'utf-8');
      }

      //Fill in the body with the content
      res.write(indexJs);
    }
    else if(req.url == "/style.css") {
      //Set status code and header
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/css');

      //Get the content to be sent back to the client if it has not already been loaded in from disk
      if (!styleCss) {
        console.log(" - reading in file from disk");
        styleCss = fs.readFileSync('public/style.css', 'utf-8');
      }

      //Fill in the body with the content
      res.write(styleCss);
    }
    else if(req.url == "/benny.jpg") {
      //Set status code and header
      res.statusCode = 200;
      res.setHeader('Content-Type', 'image/jpeg');

      //Get the content to be sent back to the client if it has not already been loaded in from disk
      if (!bennyJpg) {
        console.log(" - reading in file from disk");
        bennyJpg = fs.readFileSync('public/benny.jpg');
      }

      //Fill in the body with the content
      res.write(bennyJpg);
    }
    else if(req.url == "/404.html") {
      //Set status code and header
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');

      //Get the content to be sent back to the client if it has not already been loaded in from disk
      if (!html404) {
        console.log(" - reading in file from disk");
        html404 = fs.readFileSync('public/404.html', 'utf-8');
      }
      //Fill in the body with the content
      res.write(html404);
    }
    else {
      //Set status code and header
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');

      //Get the content to be sent back to the client if it has not already been loaded in from disk
      if (!html404) {
        console.log(" - reading in file from disk");
        html404 = fs.readFileSync('public/404.html', 'utf-8');
      }

      //Fill in the body with the content
      res.write(html404);
    }
  }

  //Send response back to client
  console.log(" - status code:", res.statusCode);
  console.log(" - Response sent");
  console.log(" ");
  res.end();
}

//Creating server
var http = require('http');
var server = http.createServer(requestHandler);

//Set the server to listen on the appropriate PORT
if (process.env.PORT) {
  server.listen(process.env.PORT, function(err) {
    if (err) {
      throw err;
    }
    console.log("==Server listening on port", process.env.PORT);
  });
}
else {
  server.listen(3000, function(err) {
    if (err) {
      throw err;
    }
    console.log("==Server listening on port 3000");
  });
}
