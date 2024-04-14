var express = require('express')
var cors = require('cors')
var XMLHttpRequest = require('xhr2');
var dateTimeFormat = require("date-fns");


var app = express()
var config = require("./config.json")


var testUrl = config.servicesURLs.minmaxURLs
console.log(testUrl);

app.use(cors({
    origin: '*',
}))


app.get('/', function (req, res) {

    var errOutput = {
        "error": false,
        "ErrorMessage": "",
        "UserReq": ""
    }

    var userRequestsFunc = req.query.RequestedFunction
    console.log(userRequestsFunc)

    let reqString = "?module_1=" + req.query.module_1 + "&mark_1=" + req.query.mark_1 + "&module_2=" + req.query.module_2 + "&mark_2=" + req.query.mark_2
        + "&module_3=" + req.query.module_3 + "&mark_3=" + req.query.mark_3 + "&module_4=" + req.query.module_4 + "&mark_4=" + req.query.mark_4
        + "&module_5=" + req.query.module_5 + "&mark_5=" + req.query.mark_5;


    var endpoint = ''
    
    if (userRequestsFunc == "minmax") {
        endpoint = config.servicesURLs.minmaxURLs + reqString 
    } else if (userRequestsFunc == "average") {
        endpoint = config.servicesURLs.averageURLs + reqString
    } else if (userRequestsFunc == "sort") {
        endpoint = config.servicesURLs.sortmodulesURLs + reqString
    } else if (userRequestsFunc == "total") {
        endpoint = config.servicesURLs.totalURLs + reqString
    } else if (userRequestsFunc == "classify"){
        endpoint = config.servicesURLs.classifyURLs + reqString
    } else if (userRequestsFunc == "mean") {
        endpoint = config.servicesURLs.meanURLs + reqString
    }else{        
        console.log("Error setting endpoint address")
        errOutput['error'] = true;
        errOutput['ErrorMessage'] = "Error setting endpoint address, please check requested func";
        errOutput['UserReq'] = userRequestsFunc;
        endpoint = ''
    }

    var parmas = {}
    for (const [field, value] of Object.entries(req.query)) {
        parmas[field] = value
    }
    console.log(parmas)
    console.log(reqString)


    let xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(this.response);
            console.log(jsonObj);
            res.send(jsonObj);
        }
    };

    if(endpoint == "" ){
        res.send(errOutput);
    }else{
        xhttp.open("GET", endpoint);
        xhttp.send();
    }
  
    
})

app.get("/monitor", function (req, res){

    const response = {
        date: dateTimeFormat(new Date(), "yyyy-MM-dd HH:mm:ss.SSSS"),
        serverHealth: "OK",
        uptime: process.uptime(),
    };
    res.status(200).json(response);
  });


app.listen(80)
