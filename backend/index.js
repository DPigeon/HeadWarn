const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(
    "Hello ImplementAI best team, continue comme ça! This is the backend!"
  );
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});