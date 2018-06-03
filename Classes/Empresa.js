function Empresa(
    nombreComercial,
    cedulaJuridica,
    email,
    telefonos,
    direccionExacta,
    descripcion
) {

    this.nombreComercial = nombreComercial;  
    this.cedulaJuridica = cedulaJuridica;
    this.email = email;
    this.telefonos = telefonos;
    this.direccionExacta= direccionExacta;
    this.descripcion=descripcion;
  
  }

  Empresa.prototype.eliminarActividad = function(idActividad) {

    //llamar func base de datos

};

Empresa.prototype.crearActividad = function() {

    //llamar func base de datos

};

  module.exports = Empresa;