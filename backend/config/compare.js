const fs = require("fs");
let comparePics = 0; // for now, later we will use parameters from pictures (10)

function readJSON(index) {
  let file;
  fs.readFile("./config/data.json", "utf8", (error, jsonString) => {
    if (error) {
      console.log("Failed to read the file.", error);
      return;
    }
    try {
      file = JSON.parse(jsonString);
      console.log(file);
    } catch (error) {
      console.log("Gotta work on your stuff man, error:", error);
    }
  });
  return file;
}

function overwriteJSON(payload) {
  const fileString = JSON.stringify(payload);
  fs.writeFile("./config/data.json", fileString, error => {
    if (error) console.log("Error, fix your thing:", error);
    else console.log("Overwrote the file.");
  });
}

module.exports = { comparePics, readJSON, overwriteJSON };
