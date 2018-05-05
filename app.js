const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const parseurl = require('parseurl');
const firebase = require('firebase');
const app = express();
const hostname = '127.0.0.1';
const port = 4000;
const config = require('./configDB.js');
const uniqid = require('uniqid');

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());

app.get('/', function(req, res) {

  
  var ref = firebase.database().ref("activities");
  
  ref.on("value", function(snapshot) {
     //console.log(snapshot.val());
     res.json(snapshot.val());
  }, function (error) {
     console.log("Error: " + error.code);
  });
  /*res.json({"prueba":0});

  console.log(req.params);
  console.log(req.query);
  console.log(req.body);*/
  


});

app.post('/', function(req, res) {
  console.log("POST REQUEST");

  res.statusCode = 200;
  res.json({"prueba":0});

  console.log(req.body);
  

});


//ENDPOINT PARA REGISTRO DE ACTIVIDADES

app.post('/cargarActividad', function(req, res) {
  console.log("POST REQUEST");

  res.statusCode = 200;
  res.json({"prueba":0});
  var obj = {}
  obj = req.body;

  obj.activityID = uniqid();
  
  insertarActividad(obj.activityID, obj);
  
  

});

//ENDPOINT PARA REGISTRO DE EMPRESA

app.post('/registroEmpresa', function(req, res) {
  console.log("POST REQUEST");

  res.statusCode = 200;
  res.json({"prueba":0});

  console.log(req.body);
  insertarEmpresa(req.body.cedula, req.body);
  

});


//ENDPOINT PARA LEER TODAS LAS ACTIVIDADES

app.get('/getAllActivities', function(req, res) {

  
  var ref = firebase.database().ref("activities");
  
  ref.on("value", function(snapshot) {
     res.json(snapshot.val());
  }, function (error) {
     console.log("Error: " + error.code);
  });


});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});





firebase.initializeApp(config);

var database = firebase.database();

function insertarActividad(activityID, activity) {
  firebase.database().ref('activities/'+activityID).set(activity);
}

function insertarEmpresa(companyID, company) {
  firebase.database().ref('companies/'+ companyID).set(company);
}




