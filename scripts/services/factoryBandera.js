angular
  .module('miApp')
  .factory('factoryBanderas', function ($http) {
    var Url = 'http://www.egos27.somee.com/api/bandera';
    var objeto = {};
    objeto.nombre = "Factory de Banderas";
    objeto.TraerTodos = TraerTodos;

    return objeto;



    function TraerTodos(){
      return $http.get(TraerUrl())
      .then(
        function(Respuesta){
          //console.info(Respuesta);
          return Respuesta.data.Paises;
        })
    }

    function TraerUrl(Parametro){
      if(!Parametro){
        return Url;
      }else{
        return Url + '/' + Parametro;
      }
    };


  })
