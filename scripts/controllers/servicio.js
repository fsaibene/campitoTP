angular
  .module('miApp')
  .controller('ConfiguradoServicios', function($scope, Banderas, i18nService, uiGridConstants) {
    $scope.titulo = Banderas.nombre;
    console.info(Banderas);
    var datos;
    Banderas.traerTodos()
    .then(
      function(respuesta){
        console.info(respuesta);
        datos = respuesta;
        $scope.gridOptions.data = datos;
      },
      function(error){
        console.info(error);
      }
      );
    console.info(datos);

    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnBand();
    $scope.gridOptions.enableFiltering = false;
    i18nService.setCurrentLang('es');

  function columnBand () {
  return [
        { field: 'Nombre', name: 'Nombre'},
        { field: 'BanderaChica', name: 'BanderaChica',cellTemplate:"<img width=\"30px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>",width: 70},
        { field: 'Bandera', name: 'Bandera',height:1000,cellTemplate:"<img width=\"100px\" height=\"100px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>",width: 100}
      ];
    }

    $scope.MostrarFoto= function(){
      Banderas.TraerSoloImagen()
      .then(
      function(respuesta){
        $scope.ListadoFotos = respuesta;
        //console.info(respuesta);
      },
      function(error){
        console.info(error);
      }
      );
    }    
  }
)
