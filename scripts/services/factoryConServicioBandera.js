angular
  .module('miApp')
  .factory('factoryconServicioBanderas', function (Banderas) {
    var Url = 'http://www.egos27.somee.com/api/bandera';
    var objeto = {};
    objeto.nombre = "Factory de Banderas";
    objeto.TraerTodos = TraerTodos;
    objeto.TraerUnPais = TraerUnPais;
    return objeto;



    function TraerTodos(){

      return Banderas.traerTodos();
    }


    function TraerUnPais(pais){
      return Banderas.TraerUnPais(pais);
    };

  


  })
