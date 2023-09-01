const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
const app = express();

client.setConfig({
  apiKey: "6f7984c3347323e2e96969130d4ef892-us13",
  server: "us13"
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res){
  const first= req.body.fName;
  const last= req.body.lName;
  const email= req.body.mail;
  console.log(first);
  console.log(last)
  console.log(email)

  const subscribingUser = {
    firstName: first,
    lastName: last,
    email: email
  };

  const run = async () => {
    try {
      const response = await client.lists.addListMember("a3ad964428", {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });
      console.log(response);
      res.sendFile(__dirname + "/success.html");
    } catch (err) {
      if (e.status === 404) {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  };

  run();

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(5000,function(){
  console.log("Server started on port 5000");
});


//api key = 6f7984c3347323e2e96969130d4ef892-us13
//audience id = a3ad964428
