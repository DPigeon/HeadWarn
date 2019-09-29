const express = require("express");
const app = express();
const { process } = require("./jobs");
const formidable = require('formidable')

app.get("/tired", (req, res, next) => {
  //res.send("hello");
  process(function(tired){
    console.log("response is here man ", tired);
    res.send({"tired": tired});
    next();
  });
});

app.post('/image', (req, res) => {
  new formidable.IncomingForm().parse(req)
    .on('field', (name, field) => {
      console.log('Field', name, field)
    })
    .on('file', (name, file) => {
      console.log('Uploaded file', name, file)
    })
    .on('aborted', () => {
      console.error('Request aborted by the user')
    })
    .on('error', (err) => {
      console.error('Error', err)
      throw err
    })
    .on('end', () => {
      res.end()
    })
})

app.get("/test", (req, res, next) => {
  res.send("Great Success");
  next();
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
