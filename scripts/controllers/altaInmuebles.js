angular
    .module('miApp')
    .controller('altaInmuebles', function($scope, $auth, $state,ABM, factoryProducto, factoryUser,FileUploader) {
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
        $scope.AltaInmueble = function() {
            $scope.user = JSON.stringify($scope.user);
            ABM.InsertarLocal($scope.user)
                .then(function(respuesta) {
                    console.log(respuesta);
                    $state.go("inicio");
                });
        }
    })/**
 * Created by ferna on 28/11/2016.
 */
/**
 * Created by ferna on 29/11/2016.
 */
