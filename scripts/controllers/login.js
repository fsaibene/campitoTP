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


            } else if (parametro === "Cliente") {
                $scope.usuario.mail = "cliente@cliente.com";
                $scope.usuario.nombre = "cliente";
                $scope.usuario.clave = "cliente";


            } else if (parametro === "Encargado") {
                $scope.usuario.mail = "encargado@encargado.com";
                $scope.usuario.nombre = "encargado";
                $scope.usuario.clave = "encargado";
            }
            else if (parametro === "Empleado") {
                $scope.usuario.mail = "empleado@empleado.com";
                $scope.usuario.nombre = "empleado";
                $scope.usuario.clave = "empleado";
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