angular
  .module('miApp').service('factoryProducto', function (servicioProducto) {
 var objeto ={};
   objeto.Insertar = Insertar;

     function Insertar(parametro)
  {	
    return servicioProducto.Insertar(parametro);

  }
 

   return objeto;
  })//cierro factory
