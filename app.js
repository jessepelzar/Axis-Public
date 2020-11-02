const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const hbs = require('express-handlebars');
const ProgressBar = require("progress");
const PORT = process.env.PORT || 5000;
const app = express();
const interface = require('./interface');
const fs = require('fs');
var base64Img = require('base64-img');
// const readline = require('readline');
// const fs = require('fs');

// var serialport = require("serialport");
var SerialPort = require("serialport");


// var SerialPort = serialport.SerialPort;

let serialPortItemArr = [];
app.post('/refreshserial', (req, res) => {
  console.log("start");
  serialPortItemArr = [];
  SerialPort.list(function(err, ports) {
    ports.forEach(function(port) {
      serialPortItemArr.push(port.comName)
      // console.log(port.comName);
    });
    console.log("--------test--------");
    console.log(serialPortItemArr);
    res.send(serialPortItemArr);
  });
  // res.send(serialPortItemArr
  // console.log(serialPortItemArr);
  // res.json({ listtest: serialPortItemArr })
});


// app.get('/refreshserial', (req, res) => {
//   res.json({ listtest: 'Flavio' })
// });


// necessary for base64 image to be sent from client
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(express.static(path.join(__dirname, 'src/public'))); // for the other files such as css
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
// app.get('/', (req, res) => res.render('pages/index', {
   // test: serialPortItemArr
// }));
app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


// app.post('/', function(req, res) {
//     console.log("posted");
// });
var serial_port = '';

/* ============================================ */
/* =============== START ROUTES =============== */
/* ============================================ */


// Make route with button to set port

app.post('/', (req, res) => {
  let port = req.body.port;
  var img = req.body.image;

  console.log(img);
  base64Img.img(img, 'uploads', '2', function(err, filepath) {});
  // res.sendFile(path.join(__dirname, "testgcode/image.png"));
  //...
  serial_port = port;
  console.log(port);

  // generate();
  console.log("generating");
  // startSerialTransmission();
  // res.end()
  // res.send(200, 'Hello HTTP!');
});

// app.post('/test', (req, res) => {
//   var img = req.body.image;
//   console.log(img);
//   base64Img.img(img, 'uploads', '1', function(err, filepath) {});
// });
var x = 0;
var y = 0;


app.post('/toggleLaserState', (req, res) => {
    let port2 = req.body.port2;
    serial_port = port2;
    console.log(port2);

    var laserState = req.body.laserToggle;
    if (laserState != "Laser ON") {
      // console.log("laser on");
      // LaserPowerOn();

      testOn();

      // LaserPowerOn1();
    }
    if (laserState != "Laser OFF") {
      // console.log("laser off");
      // LaserPowerOff();

      testOff();

      // LaserPowerOff2();
    }
});

app.post('/manualMove2', (req, res) => {
  var id = req.body.ID;
  var tick = req.body.TICK;
  let serial = req.body.SERIAL;

  console.log(serial);
  tick = parseInt(tick);
      // factual.get('/t/places',{q:'starbucks'}, function (error, data) {
  console.log("tL");

  console.log(id);
  console.log(tick);
  switch (parseInt(id)) {
    case 0:
      x -= tick;
      y += tick;
    break;
    case 1:
      y += tick;
    break;
    case 2:
      x += tick;
      y += tick;
    break;
    case 3:
      x -= tick;
    break;
    case 4:
      x += tick;
    break;
    case 5:
      x -= tick;
      y -= tick;
    break;
    case 6:
      y += tick;
    break;
    case 7:
      x += tick;
      y -= tick;
    break;
  }
  console.log("G01 " + "X" + x + " " + "Y" + y + " " + "\r");
  moveToPos(x, y);
  res.send("");
})


/* ========================================== */
/* =============== END ROUTES =============== */
/* ========================================== */



function sleep(time, callback) {
  var stop = new Date().getTime();
  while(new Date().getTime() < stop + time) {
      ;
  }
  callback();
}

var message1 = "ON";
var message2 = "OFF";
var state = 0;
function LaserPowerOn() {
  const sp = new SerialPort(serial_port, { baudRate: 115200 }, false);
  console.log('-------- Serial Port Begin ----------');
  // const SerialPort = require('serialport')
  // var serialPort = require("serialport");
  // var SerialPort = require("serialport").SerialPort;
  // const Readline = require('@serialport/parser-readline')
  // const sp = new SerialPort(serial_port, { baudRate: 115200 }, false);


  sp.open(function(err) {
        console.log("Writing serial data: " + message1);
        sp.write(message1, function(err, res) {
          console.log("inside");
                if (err) { console.log(err); }
                sp.close();
        });
  });
  // parser.on('data', line => console.log(`> ${line}`))
  // sleep(5000, function() {
  //   port.write('M03 S100');
  // });
}

function LaserPowerOff() {
  // const SerialPort = require('serialport')
  // const Readline = require('@serialport/parser-readline')
  // const port = new SerialPort(serial_port, { baudRate: 115200 })
  const sp = new SerialPort(serial_port, { baudRate: 115200 }, false);
  console.log('-------- Serial Port Begin ----------');
  // const parser = new Readline()
  // port.pipe(parser)
  sp.open(function(err) {
        console.log("Writing serial data: " + message2);
        sp.write(message2, function(err, res) {
                if (err) { console.log(err); }
                sp.close();
        });
  });
  // const parser = new Readline()
  // port.pipe(parser)

  // parser.on('data', line => console.log(`> ${line}`))
  // sleep(5000, function() {
  //   port.write('M05 S0');
  // });

}


function LaserPowerOn1() {
  const sp = new SerialPort(serial_port, { baudRate: 115200 }, false);
  console.log('-------- Serial Port Begin ----------');
  sp.open(function(err) {
    console.log("Writing serial data: " + message1);
    sleep(1500, function() {
        for (var i = 0; i < 23; i++) {
          console.log(i+1);
          sp.write(".");
        }
        sp.write("ON", function(err, res) {
          console.log("inside");
                if (err) { console.log(err); }
                sp.close();
        });
    });
  });
}

function LaserPowerOff1() {
  const sp = new SerialPort(serial_port, { baudRate: 115200 }, false);
  console.log('-------- Serial Port Begin ----------');
  sp.open(function(err) {
      console.log("Writing serial data: " + message2);
      sleep(1500, function() {
        for (var i = 0; i < 23; i++) {
          console.log(i+1);
          sp.write(".");
        }
        sp.write("OFF", function(err, res) {
                if (err) { console.log(err); }
                sp.close();
        });
    });
  });
}




function moveToPos(x, y) {
  var SerialPort = require('serialport');
  var baud = 115200;
  var sp = new SerialPort(serial_port, {baudRate: baud});
  console.log('-------- Serial Port Begin ----------');
  sp.on("open", function() {
    console.log('-------- open Port ----------');
    sp.write("");
    sleep(100, function() {
          sp.write("G01 " + "X" + x + " " + "Y" + y + " " + "\r", function(err, res) {
            console.log("inside");
                  if (err) { console.log(err); }
                  sp.close();
          });
        sp.close();
    });
  });
}

function testOn() {
  var SerialPort = require('serialport');
  var baud = 115200;
  var sp = new SerialPort(serial_port, {baudRate: baud});
  console.log('-------- Serial Port Begin ----------');
  sp.on("open", function() {
    console.log('-------- open Port ----------');
    sp.write("");
    sleep(100, function() {
          sp.write("S1000\r", function(err, res) {
            console.log("inside");
                  if (err) { console.log(err); }
                  sp.close();
          });
          testOn();
        // sp.close();
    });
  });


}

function testOff() {
  var SerialPort = require('serialport');
  var baud = 115200;
  var sp = new SerialPort(serial_port, {baudRate: baud});
  console.log('-------- Serial Port Begin ----------');
  sp.on("open", function() {
    console.log('-------- open Port ----------');
    sp.write("");
    sleep(100, function() {
        // this for loop is because when sending, the first 23 chars disapear WTF!!!
        // for (var i = 0; i < 23; i++) {
        //   console.log(i+1);
        //   sp.write(".");
        // }
        // sp.write("OFF");

        sp.write("S0\r", function(err, res) {
          console.log("inside");
                if (err) { console.log(err); }
                sp.close();
        });
        testOff();
        // sp.close();
    });
  });

}









function generate() {
  var bar = new ProgressBar("Analyze: [:bar] :percent :etas", {
    complete: ".",
    incomplete: "#",
    width: 60,
    total: 100
  });


  var img2gcode = require("img2gcode");

  // const imgFile = "/uploads/1.png";
  const imgFile = "/uploads/smileMed.png";

  const options = {
    // It is mm
    toolDiameter: 0.1,
    sensitivity: 0.1, // intensity sensitivity
    scaleAxes: 10, // default: image.height equal mm 508 x 584.2 i have it at 50
    feedrate: {
      work: 1200,
      idle: 3000
    }, // Only the corresponding line is added.
    deepStep: -1, // default: -1
    // invest: {x:true, y: false},
    laser: {
      commandPowerOn: "M03 S100",
      commandPowerOff: "M05 S0"
    },
    whiteZ: 0, // default: 0
    blackZ: -3,
    safeZ: 1,
    info: "emitter", // ["none" | "console" | "emitter"] default: "none"
    dirImg: path.normalize(__dirname + imgFile)
  };

  function imgToGCode(options) {
    return new Promise(function(resolve, reject) {
      img2gcode
        .start(options)
        .on("log", str => console.log(str))
        .on("tick", data => bar.update(data))
        .on("error", reject)
        .on("complete", data => {
          // console.log(data.config);
          // console.log(data.dirgcode);
          console.log("complete");
        })
        .then(data => {
          // console.log(data.config);
          console.log(data.dirgcode);
          resolve(data);
        });
    });
  }
  console.time("img2gcode");
  // options.dirImg = path.normalize(__dirname + "/img-and-gcode/test.png");
  imgToGCode(options).then(() => {
    console.timeEnd("img2gcode");
    console.log("end");
    startSerialTransmission2();
    // startSerialTransmissionTEST();
  });

  // =================================================== //
  // ============ LINE READER FROM GCODE  ============== //
  // =================================================== //

  // const lineByLine = require('n-readlines');
  var LineByLineReader = require('line-by-line');

  // readInterface.on('line', function(line) {
  //     console.log(line);
  // });
  // =================================================== //
  // ============ WRITE STRING TO ARDUINO ============== //
  // =================================================== //

  function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
  }

  function startSerialTransmission2() {
    var SerialPort = require('serialport');
    var baud = 115200;
    var sp = new SerialPort(serial_port, {baudRate: baud});
    console.log('-------- Serial Port Begin ----------');
    var lr = new LineByLineReader('uploads/1.gcode');

    sp.on("open", function() {
      console.log('-------- open Port ----------');
      lr.on('line', function(line) {
      sleep(100, function() {

          console.log(line);
          // for (var i = 0; i < 23; i++) {
          //   console.log(i+1);
          //   sp.write(".");
          // }
          // sp.write("ON");
          sp.write(line + "\n");
          // sp.close();
          // sp.write(line, function(err, res) {
          //   console.log("inside");
          //         if (err) { console.log(err); }
          //         sp.close();
          // });
        });
      });
    });
  }

  function startSerialTransmission() {
    var SerialPort = require('serialport');
    var baud = 115200;
    var sp = new SerialPort(serial_port, {baudRate: baud});
    console.log('-------- Serial Port Begin ----------');
    sp.on("open", function() {
      console.log('-------- open Port ----------');
      var lr = new LineByLineReader('uploads/test2.gcode');
      sleep(7000, function() {
        lr.on('line', function(line) {
        console.log(line);
        sp.write(line);
            // sleep(10, function() {
            //   sp.write(line);
            //   // sp.write("\n");
            // });
        });
      });
    });
  }

}

// -- arduino basic recieve and print to i2c lcd --
// ------------------------------------------------
// #include <Wire.h>
// #include <LiquidCrystal_I2C.h>
//
// LiquidCrystal_I2C lcd(0x27,20,4);  // set the LCD address to 0x27 for a 16 chars and 2 line display
//
//
// void setup(){
//   Serial.begin(9600);
//   lcd.init();
//   lcd.backlight();
//   lcd.setCursor(3, 0);
//   // print test for arduino
//   lcd.print("Hello, world!");
// }
// void loop(){
//
//   // wait for serial to be available
//   if (Serial.available()) {
//     // wait a bit for the entire message to arrive
//     delay(100);
//     // clear the screen
//     lcd.clear();
//     // read all the available characters
//     while (Serial.available() > 0) {
//       // display each character to the LCD
//       lcd.write(Serial.read());
//     }
//   }
// }
// ------------------------------------------------


// ======================================================= //
// ============ END WRITE STRING TO ARDUINO ============== //
// ======================================================= //
