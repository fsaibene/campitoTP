angular
    .module('miApp')
    .controller('altaLocales', function($scope, $auth, $state,ABM, factoryProducto, factoryUser, FileUploader) {
        $scope.nada = "nada";
        $scope.usuario = {};
        $scope.user = {};
        $scope.producto= {};
        if ($auth.isAuthenticated()) {
            $scope.nada = "algo";
            $scope.usuario = $auth.getPayload();
        }
        $scope.Deslogearse = function() {

            $auth.logout();
            $scope.nada = "nada";
            $state.go("inicio");
        };

        ABM.TraerTodosLosEmpleados().then(function (response) {
            $scope.empleados = response;
        });
        ABM.TraerTodosLosEncargados().then(function (response) {
            $scope.encargados = response;
        });        
        $scope.AltaLocal = function() {
            $scope.user = JSON.stringify($scope.user);
            ABM.InsertarLocal($scope.user)
                .then(function(respuesta) {
                    console.log(respuesta);
                    $state.go("inicio");
                });
        }
    })
