const fs = require("fs");
const util = require("util");
let comparePics = 0; // for now, later we will use parameters from pictures (10)

const readfile = util.promisify(fs.readFile);

async function readJSON(index) {
  let file;
  let response = readfile("./config/data.json", "utf8", (error, jsonString) => {
    if (error) {
      console.log("Failed to read the file.", error);
      return;
    }
    try {
      file = JSON.parse(jsonString);
      //console.log(file);
      return file[index];
    } catch (error) {
      console.log("Gotta work on your stuff man, error:", error);
    }
  });

  return await response;
}

function overwriteJSON(payload) {
  const fileString = JSON.stringify(payload);
  fs.writeFile("./config/data.json", fileString, error => {
    if (error) console.log("Error, fix your thing:", error);
    else console.log("Overwrote the file.");
  });
}

module.exports = { comparePics, readJSON, overwriteJSON };
