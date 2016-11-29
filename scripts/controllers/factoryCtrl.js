angular
  .module('miApp')
  .controller('factoryCtrl', function($scope, data, Banderas,factoryBanderas,i18nService, uiGridConstants) {
    $scope.titulo = "Configuracion Campos";
    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    factoryBanderas.TraerTodos()
    .then(
      function(respuesta){
        console.info(respuesta);
        //datos = respuesta;
        //$scope.gridOptions.data = datos;
      },
      function(error){
        console.info(error);
      }

      );
    //console.info(datos);

    // data.data().then(function(rta){
    //   // Cargo los datos en la grilla.
    //   $scope.gridOptions.data = rta;
    // });

    // console.log(uiGridConstants);
    console.info(factoryBanderas);
    console.info(Banderas);
    function columnDefs () {
      return [
        { field: 'Nombre', name: 'Nombre'},
        { field: 'BanderaChica', name: 'BanderaChica',cellTemplate:"<img width=\"30px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>",width: 70},
        { field: 'Bandera', name: 'Bandera',height:1000,cellTemplate:"<img width=\"100px\" height=\"100px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>",width: 100}
      ];
    }
  })
