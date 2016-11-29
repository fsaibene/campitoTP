angular
    .module('miApp')
    .controller('altasCtrl', function($scope, $auth, $state, factoryProducto, factoryUser) {
        $scope.nada = "nada";
        console.info($scope.pepe);
        $scope.usuario = {};
        $scope.user = {};
        $scope.producto= {};
        $scope.user.id="no";
        if ($auth.isAuthenticated()) {
            $scope.nada = "algo";
            $scope.usuario = $auth.getPayload();
        }
        console.info($scope.usuario);


        $scope.Deslogearse = function() {

            $auth.logout();
            $scope.nada = "nada";
            $state.go("inicio");
        }


        $scope.AltaProducto = function() {
            $scope.producto = JSON.stringify($scope.producto);
            factoryProducto.Insertar($scope.producto)
                .then(function(respuesta) {
                    console.log(respuesta);
                    $state.go("grillaUsuarios");
                    //aca se ejetuca si retorno sin errores 
                    //					 $state.go("menu.Grillas");

                });

        }
        
        $scope.AltaUsuario = function() {
            $scope.user = JSON.stringify($scope.user);
            factoryUser.InsertarUsuario($scope.user)
                .then(function(respuesta) {
                    console.log(respuesta);
                    $state.go("grillaUsuarios");
                    //aca se ejetuca si retorno sin errores 
                    //					 $state.go("menu.Grillas");

                });

        }


    })