angular
  .module('miApp').service('factoryRutas', function () {
 var objeto ={};
   objeto.nombre = "factory de rutas";
   objeto.ApiUrl = "http://localhost:81/Lab4TP/ws1/";
 

   return objeto;
  })//cierro factory
