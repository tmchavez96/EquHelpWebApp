var express = require("express")
var bp = require("body-parser")
var cors = require('cors')
var port = 4300
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@cluster0-bqkrk.mongodb.net/test?retryWrites=true&w=majority";

var app = express()
app.use(cors())
// app.use(function(req, res, next) {
//   console.log("in cors")
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });
app.use(bp.json())

// cors to allow request from all ip

app.get('/', cors(), (req, res) => res.send('Hello from server! Please leave me alone'))


app.post('/savePad', cors(), (req,res) => {
  console.log("in savePad");
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Cluster0");
    var body = req.body;
    console.log(body);
    var uid = body.userID;
    var padName = body.padName;
    var padData = body.padData;
    var myobj = { uid: uid, padName: padName, padData: padData };

    dbo.collection("EquPads").insertOne(myobj, function(err, result) {
      if (err) throw err;
      console.log("Pad was saved");
      db.close();
      res.send("succses")
    });
  });
})

app.post('/getUsersPads', cors(), (req, res) => {
  console.log("in login api");
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Cluster0");
    var body = req.body;
    console.log(body);
    var uid = body.uid;
    var flag = -1;
    var rv = []
    console.log("attempting to get pad data for user -  " + uid)
    dbo.collection("EquPads").find({}).toArray(function(err, result){
      if (err) throw err;
      console.log("*parsing db result*");
      for(var i = 0; i < result.length; i++){
        var cur = result[i];
        console.log(cur.uid + " -- " + uid)
        if(cur.uid == uid){
          rv.push(cur)
          flag = 1;
        }
      }
      if(flag < 1){
        res.send("-1");
      }else{
        res.send(rv);
      }
      db.close();
    });
  });
})

app.post('/login', cors(), (req, res) => {
  console.log("in login api");
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Cluster0");
    var body = req.body;
    console.log(body);
    var uname = body.username;
    var pass = body.password;
    var flag = 0;
    console.log("attempting to login with credentials username: " + uname + " and password: " + pass)
    dbo.collection("EquHelpUsers").find({}).toArray(function(err, result){
      if (err) throw err;
      console.log("*parsing db result*");
      for(var i = 0; i < result.length; i++){
        var cur = result[i];
        console.log(cur.username + " -- " + cur.password)
        if(cur.username == uname && cur.password == pass){
          res.send(cur);
          flag = 1;
        }
      }
      if(flag < 1){
        res.send("-1");
      }
      db.close();
    });
  });
})

app.post('/register', cors(), (req,res) => {
  console.log("in register");
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Cluster0");
    var body = req.body;
    console.log(body);
    var email = body.email;
    var uname = body.username;
    var pass = body.password;
    var myobj = { email: email, username: uname, password: pass };

    dbo.collection("EquHelpUsers").insertOne(myobj, function(err, result) {
      if (err) throw err;
      console.log("New user was registered");
      db.close();
      res.send("succses")
    });
  });
})

app.get('/getUsers', cors(), (req,res) => {
  console.log("get users was called!")
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Cluster0");
    dbo.collection("EquHelpUsers").find({}).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      res.send("here are your users!")
      db.close();
    });
  });
})


app.listen(port, () => console.log("server running"))