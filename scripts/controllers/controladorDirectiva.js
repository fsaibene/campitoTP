angular
  .module('miApp')
  .controller('DirectivaCtrl', function($scope, data, i18nService, uiGridConstants,factoryconServicioBanderas) {
    $scope.titulo = "Configuracion Directiva";
    $scope.Listado = {};
    factoryconServicioBanderas.TraerTodos()
    //Banderas.TraerUnPais('argentina')
    .then(
      function(respuesta){
        console.info(respuesta);
        $scope.Listado = respuesta;
      },
      function(error){
        console.info(error);
      }

      );
  })
