const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
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

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us17.api.mailchimp.com/3.0/lists/2a711d7f1f";

  const option = {
    method: "POST",
    auth: "hanzalas:755644587bc6b92252b2718110a32d90-us17",
  };

  const request = https.request(url, option, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Exaample app listening at http://localhost:${port}`);
});

// API KEY
// 755644587bc6b92252b2718110a32d90-us17

// Audience List KEY
// 2a711d7f1f
