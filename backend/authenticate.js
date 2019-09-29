var request = require("request");

var options = {
    method: 'POST',
    url: 'https://api.wrnch.ai/v1/login',
    headers:
    {
        'Content-Type': 'application/json'
    },
    body: { username: 'eglen', password: 'Abrakatabra1' },
    json: true
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});