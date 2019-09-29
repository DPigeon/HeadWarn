const fs = require("fs");
var data = require('./data.json');
let comparePics = 0; // for now, later we will use parameters from pictures (10)

function readJSON(index) {
 return data[index];
}

function overwriteJSON(payload) {
  const fileString = JSON.stringify(payload);
  fs.writeFile("./config/data.json", fileString, error => {
    if (error) console.log("Error, fix your thing:", error);
    else console.log("Overwrote the file.");
  });
}

//console.log(readJSON(1));
module.exports = { comparePics, readJSON, overwriteJSON };
