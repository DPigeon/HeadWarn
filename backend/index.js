const express = require("express");
var buffer = require('buffer');
const fs = require("fs");
const path = require ("path");
const app = express();
const { process } = require("./jobs");
const formidable = require('formidable')
var bodyParser = require("body-parser");
var multer = require('multer');
var database64 = require('./base64.json');
var upload = multer({
  limits: {fieldSize: 25 * 1024 * 1024}
});
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.get("/tired", (req, res, next) => {
  //res.send("hello");
  process(function(tired){
    //console.log("response is here man ", tired);
    var answer = { "tired": tired };
    res.send(JSON.stringify(answer));
    next();
  });
});

app.post('/image', (req, res) => {
  //console.log(req.body.base64);
  decode_base64(req.body.base64, "person.jpg");
  //decode_base64(database64[0], "picture1.jpg");
  console.log("FINISH");
})

app.get("/test", (req, res, next) => {
  res.send("Great Success");
  next();
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

function decode_base64(base64str, filename) {
  var buf = Buffer.from(base64str, 'base64');
  fs.writeFile(path.join(__dirname, './', filename), buf, function (error) {
    if (error) {
      throw error;
    } else {
      console.log('File created from base64 string!');
      return true;
    }
  });

}