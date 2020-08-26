const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/sign-up.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.mail;
  console.log(firstName, lastName, email);
});

app.listen(port, () => {
  console.log(`Exaample app listening at http://localhost:${port}`);
});
