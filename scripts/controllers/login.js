angular
    .module('miApp')
    .controller("loginCtrl", function(factoryLoginABM, $scope, $state, $auth, $http) {
        $scope.usuario = {};
        $scope.authenticate = function(provider) {
            $auth.authenticate(provider);
        };
        $scope.Carga = function(parametro) {
            if (parametro === "Administrador") {
                $scope.usuario.mail = "admin@admin.com";
                $scope.usuario.nombre = "administrador";
                $scope.usuario.clave = "administrador";


            } else if (parametro === "Vendedor") {
                $scope.usuario.mail = "vendedor@vendedor.com";
                $scope.usuario.nombre = "vendedor";
                $scope.usuario.clave = "vendedor";


            } else if (parametro === "Comprador") {
                $scope.usuario.mail = "comprador@comprador.com";
                $scope.usuario.nombre = "comprador";
                $scope.usuario.clave = "comprador";
            }
        }
        if ($auth.isAuthenticated())
            console.info("Token", $auth.getPayload());
        else
            console.info("No Token", $auth.getPayload());

        $scope.Login = function() {
            $scope.usuario = JSON.stringify($scope.usuario);

            factoryLoginABM.validarLogin($scope.usuario)
                .then(function(respuesta) {
                    console.info(respuesta);

                    if (respuesta != true) {
                        $scope.usuario = {};
                        console.log("no entro");
                    } else {
                        console.log("entro");
                        factoryLoginABM.TraerObjeto($scope.usuario)
                            .then(function(respuesta) {
                                $auth.login(respuesta)
                                    .then(function(response) {
                                        console.info(response);
                                        if ($auth.isAuthenticated()) {
                                            $state.go("inicio");
                                            console.info("Token Validado", $auth.getPayload());
                                            $scope.usuario = {};
                                        } else
                                            console.info("No Token Valido", $auth.getPayload());
                                        $scope.usuario = {};
                                    })
                                    .catch(function(response) {
                                        console.info("no", response);
                                    });
                            }, function errorCallback(response) {
                                $scope.ListadoPersonas = [];
                                console.log(response);
                            });
                    }
                });
        }
    })