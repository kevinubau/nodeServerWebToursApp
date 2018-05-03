const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const parseurl = require('parseurl');
const path = require('path');
const firebase = require('firebase');
const app = express();
const hostname = '127.0.0.1';
const port = 4000;
const config = require('./configDB.js');


app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {

  res.statusCode = 200;
  res.json({"prueba":0});

  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  


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

  console.log(req.body);
  insertarActividad('company_1', 0, req.body);
  

});

//ENDPOINT PARA REGISTRO DE EMPRESA

app.post('/registroEmpresa', function(req, res) {
  console.log("POST REQUEST");

  res.statusCode = 200;
  res.json({"prueba":0});

  console.log(req.body);
  insertarEmpresa(req.body.cedula, req.body);
  

});





app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});





firebase.initializeApp(config);

var database = firebase.database();

function insertarActividad(companyID, activityID, activity) {
  firebase.database().ref('activities/'+ companyID +'/'+ activityID).set(activity);
}

function insertarEmpresa(companyID, company) {
  firebase.database().ref('companies/'+ companyID).set(company);
}