var fs = require("fs");
var request = require("request");
const { readJSON, overwriteJSON } = require("./config/compare");
let PICTURE = "person.jpg"
let file = fs.createReadStream(`${PICTURE}`);
let TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ3OCwiYWRkb25zIjp7fSwiZXhwIjoxNTY5NzU5MTIwLCJpZGVudGl0eSI6NDc4LCJpYXQiOjE1Njk3NTE5MjAsImp0aSI6ImZlOTQyMmQ2ZmQyMzk4YjM2ZjkxODg4OWQyYzQ1YjVkNTE3MDRjMzI1YTk4ZTg3OGI4MGExZjEwMmNhZmVkMzMiLCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOiJmYWYifQ.zRE5gZO2n3bLlFD7hsASOlAty3rb972FjgG99QzjVQQ'

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

function getJob(jobID, callback) {
    var jobResponse = {
        method: 'GET',
        url: `https://api.wrnch.ai/v1/jobs/${jobID}`,
        qs: { work_type: 'json' },
        headers:
        {
            Authorization: TOKEN
        }
    };
    request(jobResponse, function (error, response, body) {
        if (error) throw new Error(error);
        let jsonBody = JSON.parse(body);
        /****************** We will edit the joints ********/
        let joints = jsonBody.frames[0].persons[0].pose2d.joints;
        console.log("This is the joints: ",joints);
        if(joints.length < 20){
            callback(response(0));
        }else{
            callback(cleanArray(joints));
        }
    });
}

function cleanArray(joints){
    positiveJoints = joints.filter(function (x) { return x > 0 });
    console.log("Positive values: ",positiveJoints);
    finalJoints = positiveJoints
    finalJoints.forEach(function (part, index) {
        if ((index % 2) === 1) { this[index] = this[index] - (2 * this[index]);}
        return this[index];
    }, finalJoints); // use arr as this
    console.log("Final values: ", finalJoints);
    /***************Main Logic*********************************/
    let data = analyzer(finalJoints)
    console.log("analyzer", )
    return data;
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

    if (leftEye[1] < readJSON(1)) { 
        overwriteJSON(joints);
        return response(0);
    }  
    else if (rightEye[1] >= readJSON(1)) {
       overwriteJSON(joints);
      return response(1);
  }
}

function response(id) {
    let TIRED = 0;
    let AWAKE = 1;

    if (id === TIRED) {
        console.log("Tired");
        return TIRED;
    } else {
        console.log("Awakes");
        return AWAKE;
    }
    //overwriteJSON();
}


/****************** Main function  ********/
function process(callback){
    request(jobRequest, function (error, response, body) {
        if (error) throw new Error(error);
        let jsonBody = JSON.parse(body);
        console.log("Job Id", jsonBody.job_id);
        console.log('ZZZzzZzzzzZZZZz for 2 seconds');
        setTimeout(function () {
            getJob(jsonBody.job_id, function (answer) {
                console.log("Callbackhell answer:", answer);
                callback(answer);
            });
        }, 2000);
    });
}

//  function main(){
//     process(function(answer){
//         console.log("final answer", answer);
//     });
// }

module.exports = { process };
/****************** Main function  ********/



