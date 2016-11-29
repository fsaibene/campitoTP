angular
  .module('miApp')
  .service('Banderas', function ($http,factoryRutas) {
    this.nombre = "Axel";

    var Url = factoryRutas.ApiBanderas;
    //Esta funcion es privada
    function TraerUrl(Parametro){
      if(!Parametro){
        return Url;
      }else{
        return Url + '/' + Parametro;
      }
    };

    this.traerTodos = function(){
      return $http.get(TraerUrl())
      .then(
        function(Respuesta){
          //console.info(Respuesta);
          return Respuesta.data.Paises;
        })
    };

    this.TraerSoloImagen=TraerSoloImagen;
    function TraerSoloImagen(){
     return $http.get(TraerUrl())
      .then(
        function(Respuesta){
          //console.info(Respuesta);
          var arrays = [];
          Respuesta.data.Paises.forEach(function(rta,i){
            //console.info(rta.Bandera);
            arrays.push({'id': i, 'Bandera':rta.Bandera});
          })
          return arrays;
        })
    }


    this.TraerUnPais=TraerUnPais;
    function TraerUnPais(Pais){
      return $http.get(TraerUrl(Pais))
      .then(
        function(Respuesta){
          //console.info(Respuesta);
          return Respuesta.data;
        })
    }
  })
