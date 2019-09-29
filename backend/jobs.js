var fs = require("fs");
var request = require("request");
const { comparePics } = require("./config/compare");
let PICTURE = "person.png";
let file = fs.createReadStream(`./${PICTURE}`);
let { readJSON } = require("./config/compare");
let TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ3OCwiYWRkb25zIjp7fSwiZXhwIjoxNTY5NzM2NDM4LCJpZGVudGl0eSI6NDc4LCJpYXQiOjE1Njk3MjkyMzgsImp0aSI6ImVhOWM3NDM5YWMxNjkxZTc2Zjk3YWY3NjljZDU4MmIwODAzMTk1NmQyMWVjM2M5ZjViMGIxOTQyMmI5NjU1NTYiLCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOiJmYWYifQ.TBdrw67RnEFyjl5iwMrki5U3CIKaV8qifhmXVy-z2Oo";

var jobRequest = {
  method: "POST",
  url: "https://api.wrnch.ai/v1/jobs",
  headers: {
    "Content-Type":
      "multipart/form-data; boundary=--------------------------780487085191623441098948",
    Authorization: TOKEN
  },
  formData: {
    work_type: "json",
    heads: "true",
    est_3d: "true",
    media: file
  }
};

function getJob(jobID) {
  var jobResponse = {
    method: "GET",
    url: `https://api.wrnch.ai/v1/jobs/${jobID}`,
    qs: { work_type: "json" },
    headers: {
      Authorization: TOKEN
    }
  };
  request(jobResponse, function(error, response, body) {
    if (error) throw new Error(error);
    let jsonBody = JSON.parse(body);
    /****************** We will edit the joints ********/
    let joints = jsonBody.frames[0].persons[0].pose2d.joints;
    console.log("This is the joints: ", joints);
    cleanArray(joints);
    //readJSON(1);
  });
}

function cleanArray(joints) {
  positiveJoints = joints.filter(function(x) {
    return x > 0;
  });
  console.log("Positive values: ", positiveJoints);
  finalJoints = positiveJoints;
  finalJoints.forEach(function(part, index) {
    if (index % 2 === 1) {
      this[index] = this[index] - 2 * this[index];
    }
    return this[index];
  }, finalJoints); // use arr as this
  console.log("Final values: ", finalJoints);
  /***************Main Logic*********************************/
  analyzer(finalJoints);
  /***************Main Logic*********************************/
}

function analyzer(joints) {
  let topMouth = [joints[0], joints[1]];
  let chin = [joints[2], joints[3]];
  let middleOfEyes = [joints[4], joints[5]];
  let leftShoulder = [joints[6], joints[7]];
  let rightShoulder = [joints[8], joints[9]];
  let nose = [joints[10], joints[11]];
  let leftEye = [joints[12], joints[13]];
  let leftEar = [joints[14], joints[15]];
  let rightEye = [joints[16], joints[17]];
  let rightEar = [joints[18], joints[19]];

  if (leftEye[1] < comparePics && rightEye[1] < comparePics) {
    console.log("Tired");
    return 0;
  }
  if (leftEye[1] >= comparePics && rightEye[1] >= comparePics) {
    console.log("Awake");
    return 1;
  }
}

/****************** Main function  ********/
request(jobRequest, function(error, response, body) {
  if (error) throw new Error(error);
  let jsonBody = JSON.parse(body);
  console.log("Job Id", jsonBody.job_id);
  console.log("ZZZzzZzzzzZZZZz for 5 seconds");
  setTimeout(function() {
    getJob(jsonBody.job_id);
  }, 5000);
});
