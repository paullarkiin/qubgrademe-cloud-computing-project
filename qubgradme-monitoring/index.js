const express = require("express");
const Datastore = require("nedb");
const cors = require('cors')
const nodemailer = require("nodemailer");
const cron = require('node-cron');


const app = express();
app.listen(80, () => console.log("listening at 80"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.options('*', cors())

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.send(data);
  });
});

app.post("/api", (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});


async function checkDatabase() {


  let emailValues = {
    "ServerErrror": "false",
    "Date": "",
    "Service": "",
    "ServiceCode": "",
    "ErrorMessage": ""
  }
  
  database.find({}, (err, data) => {

    for (item in data) {

      if (data[item].serverStatus != "OK") {

        var emailBody = "\r\n Service Report \r\n";
        emailBody += "--------------------------------------" + "\n";

        var timestamp = new Date(data[item].date).toLocaleString()

        let err = emailValues['ServerErrror'] = "true" + "\n";
        let datetime = emailValues['Date'] = timestamp + "\n";
        let servicename = emailValues['Service'] = data[item].whichService + "\n";
        let servicecode = emailValues['ServiceCode'] = data[item].serverStatus + "\n";
        let errMsg = emailValues['ErrorMessage'] = "Please Check Service - Returned Value Other Than OK - 200" +"\n";


        emailBody += "ServerError: " + err;
        emailBody += "Date: " + datetime;
        emailBody += "Service: " + servicename;
        emailBody += "Status Code: " + servicecode;
        emailBody += "Error Message: " + errMsg;
        

        emailBody += "--------------------------------------" + "\n";

        sendEmail(emailBody);
      }
    }
  });
}

async function sendEmail(emailBody) {
 
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'sandra13@ethereal.email',
      pass: 'pVCUp7gUB1QV41kaw3'
    }
});

  let info = await transporter.sendMail({
    from: 'sandra13@ethereal.email', // sender address
    to: "sandra13@ethereal.email", // list of receivers
    subject: "Service Monitoring: Error Reported ", // Subject line
    text:  emailBody
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

function emptyDatabase(){

  database.remove({}, (err) => {
    console.log("------------");
    console.log("Emptying Database");
});
}


cron.schedule("* */1 * * *", () => {
  console.log('---------------------');
  console.log('Running Cron Job - Checking Database for server status');
  checkDatabase();
});

cron.schedule("* */12 * * *", () => {
  console.log('---------------------');
  console.log('Running Cron Job - Cleaning Records');
  emptyDatabase();
});


module.exports = app;