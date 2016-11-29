angular
  .module('miApp').service('factoryUser', function (Login,ABM,factoryRutas) {
objeto = {};
   objeto.nombre = "factory abm";
   objeto.InsertarUsuario = InsertarUsuario;
  
  
   return objeto;

 function InsertarUsuario(parametro){
  console.info(parametro);
      return ABM.InsertarUsuario(parametro);

        
     }

  })//cierro factory
