var express = require('express');
var router = express.Router();
var serialport = require("serialport");
const app = express();



let serialPortItemArr = [];

var SerialPort = serialport.SerialPort;
var util = require("util"), repl = require("repl");

// serialport.list(function (err, ports) {
//   ports.forEach(function(port) {
//     serialPortItemArr.push(port.comName)
//     console.log(port.comName);
//   });
//   console.log("--------test--------");
//   console.log(serialPortItemArr);
// });
//
// app.get('/', function(req, res) {
//     var test = "serialPortItemArr";
//
//     res.render('pages/index', {
//         test: test
//     });
// });

// router.get('/', function(req, res) {
//     // var serialAvail = serialPortItemArr;
//     // var serialList = serialAvail.reduce(function(serialList, city) {
//     //   // serialList.push(require('../public/cityData/' + city))
//     //   return serialList;
//     // }, [])
//
//     //TODO::need to update this to send an array
//     res.render('map', {
//         serialList : JSON.stringify(serialPortItemArr),
//     });
// });
//
// module.exports = router;

// app.get('/', function(req, res) {
//     res.render('index', {
//         serialport: "test",
//     });
// });

// module.exports = router;
