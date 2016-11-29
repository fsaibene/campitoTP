angular
  .module('miApp')
  .controller('inicioCtrl', function($scope,$auth,$state) {
	$scope.nada="nada";
  	$scope.usuario= [];
	  
	if($auth.isAuthenticated()) {
		$scope.nada = "algo";
		$scope.usuario = $auth.getPayload();
	}

console.info($scope.usuario);
	$scope.Deslogearse = function(){

		$auth.logout();
		console.log("se deslogueoo");
		$scope.usuario = {};
		$scope.nada="nada";
		$state.go("inicio");
	};
	$scope.IrLogin = function () {
		$state.go("login");
	};

  })
