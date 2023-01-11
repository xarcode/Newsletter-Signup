const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "8f3dbf7ebc525f4b719aec13efc07bbb-us10",
  server: "us10",
});

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

async function run(fName, lName, email, res){
  try {
    const response = await mailchimp.lists.addListMember("6c31db23fe", {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      });
      res.sendFile(__dirname + "/success.html")
  } catch (error) {
    res.sendFile(__dirname + "/failure.html")
  }
};

app.post("/", (req, res) => {
  var fName = req.body.fName;
  var lName = req.body.lName;
  var email = req.body.email;

  //   console.log(fName);
  //   console.log(lName);
  //   console.log(email);

  run(fName, lName, email, res);

//   res.send(status);
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is set up on port 3000...");
});

// API KEY
// 8f3dbf7ebc525f4b719aec13efc07bbb-us10

// LIST ID
// 6c31db23fe
