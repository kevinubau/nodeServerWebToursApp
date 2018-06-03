function Administrador(

    lista,
  
) {

    this.lista=lista;

  
  }

Administrador.prototype.get = function() {

    return this.lista;
};

Administrador.prototype.insert = function(number) {

    this.lista.push(number);
};

module.exports = Administrador;