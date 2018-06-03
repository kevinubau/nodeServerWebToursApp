function Actividad(

    fechaInicio,
    fechaFin,
    lugarDestino,
    LugarSalida,
    precio,
    cupo,
    imagenes,
    titulo,
    horaInicio,
    horaFin,
    integrantes,
    categoria,
    dificultad,
    descripcion,
    recomendaciones,
    longitude,
    latitude,
    activityID,
    email

) {

    this.fechaInicio=fechaInicio;
    this.fechaFin=fechaFin;
    this.lugarDestino=lugarDestino;
    this.LugarSalida=LugarSalida;
    this.precio=precio;
    this.cupo=cupo;
    this.imagenes=imagenes;
    this.titulo=titulo;
    this.horaInicio=horaInicio;
    this.horaFin=horaFin;
    this.integrantes=integrantes;
    this.categoria=categoria;
    this.dificultad=dificultad;
    this.descripcion=descripcion;
    this.recomendaciones=recomendaciones;
    this.longitude=longitude;
    this.latitude=latitude;
    this.activityID=activityID;
    this.email=email;
  
  }

  Actividad.prototype.insertarIntegrante = function(IDintegrante) {

    this.integrantes.push(IDintegrante);

};


module.exports = Actividad;