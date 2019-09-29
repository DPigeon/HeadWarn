var fs = require("fs");
var request = require("request");
let file = fs.createReadStream("/Users/eglenceo/Desktop/ImplementAI/ImplementAI-2019/person.png");
let TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ3OCwiYWRkb25zIjp7fSwiZXhwIjoxNTY5NzI5MTY3LCJpZGVudGl0eSI6NDc4LCJpYXQiOjE1Njk3MjE5NjcsImp0aSI6IjNiYjkxMDZkMTc4MDEwZDg4ZDZmYzQ5NTQ3MGM3MGY2MTNhMDhjZDc4Njk3NjA3ZTBmMmZhODY3Mjc1YzMxNzgiLCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOiJmYWYifQ.8Bk0wJWoatatDTAFcsXs0wwSR65l5sukqv3KQwbeIWc'

var jobRequest = {
    method: 'POST',
    url: 'https://api.wrnch.ai/v1/jobs',
    headers:
    {
        'Content-Type': 'multipart/form-data; boundary=--------------------------780487085191623441098948',
        Authorization: TOKEN,
    },
    formData:
    {
        work_type: 'json',
        heads: 'true',
        est_3d: 'true',
        media: file
    }
};

function getJob(jobID) {
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
        cleanArray(joints);
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
}


/****************** Main function  ********/
request(jobRequest, function (error, response, body) {
    if (error) throw new Error(error);
    let jsonBody = JSON.parse(body);
    console.log("Job Id",jsonBody.job_id);
    console.log('ZZZzzZzzzzZZZZz for 5 seconds');
    setTimeout(function () {
        getJob(jsonBody.job_id);
        }, 5000);
});
    
