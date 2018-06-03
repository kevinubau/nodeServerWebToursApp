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
const fs = require('fs'); 
const geodist = require('geodist');

var Actividad = require('./Classes/Actividad.js');
var Administrador = require('./Classes/Administrador.js');
var Empresa = require('./Classes/Empresa.js');





app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());

app.get('/', function(req, res) {


  var tec = {lat: 10.3644833031858, lon: -84.5112561481323}    
  var cq = {lat: 10.323954186799517, lon: -84.42817204168699}

  console.log(geodist(tec, cq, {exact: true, unit: 'km'}) ); // => 249

  /*let base64String = ""; // Not a real image
  // Remove header
  let base64Image = base64String.split(';base64,').pop();
  fs.writeFile('image.png', base64Image, {encoding: 'base64'}, function(err) {
      console.log('File created');
  });*/

  
  /*var ref = firebase.database().ref("activities");
  
  ref.on("value", function(snapshot) {
     //console.log(snapshot.val());
     res.json(snapshot.val());
  }, function (error) {
     console.log("Error: " + error.code);
  });*/
  /*res.json({"prueba":0});

  console.log(req.params);
  console.log(req.query);
  console.log(req.body);*/
  
  /*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx*/

  var firebaseRef = firebase.database().ref("activities/");
    firebaseRef.orderByChild("categoria").equalTo("").on('value', function(data) {
      //console.log("Start at filter: " + data.val());
      console.log("Start at filter: " + data.key);
      res.json(data.val());
      
  });
 

  

  /*var firebaseRef = firebase.database().ref("pruebas/");
    firebaseRef.orderByChild("edad").endAt(30).on('value', function(data) {
      console.log("Start at filter: " + JSON.stringify(data.val()));
      res.json(data.val());
  });*/

  



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

app.post('/registroEmpresaOld', function(req, res) {
  console.log("POST REQUEST");

  res.statusCode = 200;
  res.json({"prueba":0});

  console.log(req.body);
  insertarEmpresa(req.body.cedula, req.body);
  

});

app.post('/registroEmpresa', function(req, res) {
  console.log("POST REQUEST");

  res.statusCode = 200;
  res.json({"prueba":0});

  console.log(req.body);
  //insertarEmpresa(req.body.cedula, req.body);
  /*
  nombreComercial,
    cedulaJuridica,
    email,
    telefonos,
    direccionExacta,
    descripcion
  */
  var nuevaEmpresa =  new Empresa(req.body.nombreEmpresa, req.body.cedula, req.body.email, req.body.telefono, req.body.direccion, "");
  //signUp(nuevaEmpresa.email, req.body.pass);
  //insertarEmpresa(req.body.cedula, nuevaEmpresa);
  firebase.auth().createUserWithEmailAndPassword(nuevaEmpresa.email, req.body.pass).catch(function(error) {
    
    if (error) {
      console.log('Authentication error: ', error);
     
      res.json({"error": error.code});
    }
    
    
    
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("logged user = "+JSON.stringify(user));
      insertarEmpresa(req.body.cedula, nuevaEmpresa);
      res.json({"usuario": user.email});

    } else {
      // No user is signed in.
      console.log("error x ");
    }


  });




});


//ENDPOINT PARA LOGIN DE EMPRESAS
app.post('/login', function(req, res) {
  console.log("POST REQUEST LOGIN");

  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("Sign-out successful.");
  }).catch(function(error) {
    // An error happened.
    console.log("ERROR.");
  });


  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {


    if (error) {
      console.log('Authentication error: ', error);
     
      res.json({"error": error.code});
    }


  });


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("logged user = "+JSON.stringify(user));
      
      res.json({"usuario": user.email});

    } else {
      // No user is signed in.
      console.log("error x ");
    }
    
  });


  
  //signIn(req.body.email, req.body.password);
  
  

});


//ENDPOIINT PARA FORGOT PASSOWORD

app.post('/forgotPassword', function(req, res) {
  console.log(req.body);
 


  firebase.auth().sendPasswordResetEmail(req.body.email).then(function() {
    console.log("Exitoso!");
    res.send({responseMessage:"Te hemos enviado un correo para restaurar tu contraseña!"});

  }).catch(function(error) {

    // An error happened.
    console.log("bad !");
    var errorCode = error.code;
    
    if(errorCode == "auth/user-not-found"){
      res.send({responseMessage:"Correo no se encuentra registrado!"});
    }
    else if(errorCode == "auth/internal-error"){
      res.send({responseMessage:"Error interno, puede que haya excedido la cantidad de solicitudes!"});
    }


  });


  
 






});
//firebase.auth().sendPasswordResetEmail('user@example.com')

//ENDPOINT PARA LEER TODAS LAS ACTIVIDADES

app.get('/getAllActivities', function(req, res) {

  
  var ref = firebase.database().ref("activities");
  
  ref.on("value", function(snapshot) {
     res.json(snapshot.val());
  }, function (error) {
     console.log("Error: " + error.code);
  });


});


app.get('/sigInPrueba', function(req, res) {

  signUp("ubau1132456788@gmail.com", "holamundO");
  
  firebase.auth().createUserWithEmailAndPassword("ubauuu1132456788@gmail.com", "holamundO").catch(function(error) {
    
    var errorCode = error.code;
    console.log("error code: "+errorCode);
    var errorMessage = error.message;
    console.log("error message: "+errorMessage);
    
    
    
  });
  
  
  
  res.statusCode = 200;
  res.json({"prueba":0});

});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});





firebase.initializeApp(config);

function signUp(email, password){
  

  
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    
    var errorCode = error.code;
    console.log("error code: "+errorCode);
    var errorMessage = error.message;
    console.log("error message: "+errorMessage);
    
    
    
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("logged user = "+JSON.stringify(user))
    } else {
      // No user is signed in.
      console.log("error ");
    }
  });
  
  
  
}


function signIn(email, password){
  
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {


    if (error) {
      console.log('Authentication error: ', error);
    }


  });


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("logged user = "+JSON.stringify(user));
      return user;
    } else {
      // No user is signed in.
      console.log("error x ");
    }
    
  });

}

var database = firebase.database();

function insertarActividad(activityID, activity) {
  firebase.database().ref('activities/'+activityID).set(activity);
}

function insertarEmpresa(companyID, company) {
  firebase.database().ref('companies/'+ companyID).set(company);
}

/*
var a =  new Administrador([]);
a.insert(4);
a.insert(4);
a.insert(4);
console.log(a.get());

for (let index = 0; index < a.lista.length; index++) {
  console.log(a.lista[index]);
  
}

console.log(a);*/




