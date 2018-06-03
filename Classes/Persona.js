function Persona(
    nombre,
    apellido1,
    correo,
    imagen,
    tarjetas
    
) {

    this.nombre = nombre;  
    this.apellido1 = apellido1;
    this.correo = correo;
    this.imagen = imagen;
    this.tarjetas = tarjetas;
    
  
  }

  Persona.prototype.agregarTarjeta = function(idTarjeta) {

    this.tarjetas.push(idTarjeta);

};

Persona.prototype.eliminarTarjeta = function(idTarjeta) {

    const index = this.tarjetas.indexOf(idTarjeta);
    array.splice(index, 1);
    this.tarjetas.splice(index,1);

};



  module.exports = Persona;