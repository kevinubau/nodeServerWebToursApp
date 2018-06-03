function Tarjeta(
    nombreDueño,
    codigoSeguridad,
    empresa,//visa, mastercard etc
    
) {

    this.nombreDueño = nombreDueño;  
    this.codigoSeguridad = codigoSeguridad;
    this.empresa = empresa;
    
  
  }



  module.exports = Tarjeta;