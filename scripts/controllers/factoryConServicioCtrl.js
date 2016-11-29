angular
  .module('miApp')
  .controller('factoryConServicioCtrl', function($scope, data, Banderas,factoryconServicioBanderas,i18nService, uiGridConstants) {
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


    factoryconServicioBanderas.TraerUnPais('argentina')
    .then(
      function(respuesta){
        console.info(respuesta);
      },
      function(error){
        console.info(error);
      }

      );

    factoryconServicioBanderas.TraerTodos()
    .then(
      function(respuesta){
        $scope.gridOptions.data = respuesta;
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
    console.info(factoryconServicioBanderas);
    console.info(Banderas);
    function columnDefs () {
      return [
        { field: 'Nombre', name: 'Nombre'},
        { field: 'BanderaChica', name: 'BanderaChica',cellTemplate:"<img width=\"30px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>",width: 70},
        { field: 'Bandera', name: 'Bandera',height:1000,cellTemplate:"<img width=\"100px\" height=\"100px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>",width: 100}
      ];
    }
  })
