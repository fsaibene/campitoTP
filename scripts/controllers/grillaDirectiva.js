angular
  .module('miApp')
  .controller('grillaDirectivaCtrl', function($scope,$auth,$state,factoryGrilla) {
  			$scope.nada="nada";

  	$scope.usuario= [];
if($auth.isAuthenticated())
{
		$scope.nada = "algo";

	$scope.usuario = $auth.getPayload();
}
console.info($scope.usuario);


$scope.Deslogearse = function(){

	$auth.logout();
	$scope.nada="nada";
	$state.go("inicio");
}

$scope.titulo = "Configuracion Directiva";
    $scope.Listado = {};
    factoryGrilla.TraerTodos()
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
