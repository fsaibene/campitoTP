angular
  .module('miApp').service('factoryLoginABM', function (Login,ABM,factoryRutas) {
objeto = {};
   objeto.nombre = "factory de login y abm";
   objeto.validarLogin = validarLogin;
   objeto.TraerObjeto= TraerObjeto;
   objeto.Insertar = Insertar;
   objeto.ApiArchivos = ApiArchivos;
   objeto.Guardar = Guardar;
   return objeto;

 function validarLogin(parametro){
      return Login.validarLogin(parametro);
     }

 function TraerObjeto(parametro){
      return Login.TraerObjeto(parametro);
     }

  function Insertar(parametro)
  {
    return ABM.Insertar(parametro);

  }

  function ApiArchivos(){
    return factoryRutas.ApiUrl + "archivos";
  }
  function Guardar()
  {
    return ABM.Guardar;
  }
  })//cierro factory
