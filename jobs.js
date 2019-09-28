var fs = require("fs");
var request = require("request");
let file = fs.createReadStream("/Users/eglenceo/Desktop/ImplementAI/ImplementAI-2019/person.png");
let jobId = 'f101688e-ecb9-446c-a4bd-118369cf59a2';

var sendJob = {
    method: 'POST',
    url: 'https://api.wrnch.ai/v1/jobs',
    headers:
    {
        'Content-Type': 'multipart/form-data; boundary=--------------------------780487085191623441098948',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ3OCwiYWRkb25zIjp7fSwiZXhwIjoxNTY5NzA3Nzk3LCJpZGVudGl0eSI6NDc4LCJpYXQiOjE1Njk3MDA1OTcsImp0aSI6IjI3MDJhMWMxNWM3MjQwYzBhZWNjYTM5ZGFmOTM0ZDA1OTY3ZThjN2NhZjgxODNhMDkyNDc0ZWE2MmVlOTMxZTQiLCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOiJmYWYifQ.jjf7aEgFJELfMWdcX-3Y3IWj0kz0d-kJGet4AKtEUcM',
    },
    formData:
    {
        work_type: 'json',
        heads: 'true',
        est_3d: 'true',
        media:  file
    }
};

var getJob = {
    method: 'GET',
    url: `https://api.wrnch.ai/v1/jobs/${jobId}`,
    qs: { work_type: 'json' },
    headers:
    {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ3OCwiYWRkb25zIjp7fSwiZXhwIjoxNTY5NzA3Nzk3LCJpZGVudGl0eSI6NDc4LCJpYXQiOjE1Njk3MDA1OTcsImp0aSI6IjI3MDJhMWMxNWM3MjQwYzBhZWNjYTM5ZGFmOTM0ZDA1OTY3ZThjN2NhZjgxODNhMDkyNDc0ZWE2MmVlOTMxZTQiLCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOiJmYWYifQ.jjf7aEgFJELfMWdcX-3Y3IWj0kz0d-kJGet4AKtEUcM'
    }
};

request(getJob, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
