angular
    .module('miApp')
    .controller('grillaCtrl', function($scope, $state, factoryGrilla, i18nService, uiGridConstants, $auth) {
        $scope.titulo = "Configuracion Campos";
        console.info(factoryGrilla);

        $scope.usuario = $auth.getPayload();
        // Objeto de configuracion de la grilla.
        $scope.gridOptions = {};
        $scope.gridOptions.enableCellEditOnFocus = true;
        $scope.gridOptions.enableCellEdit = true;
        $scope.gridOptions.paginationPageSizes = [25, 50, 75];
        // Configuracion de la paginacion
        $scope.gridOptions.paginationPageSize = 25;
        if ($scope.usuario.perfil === "comprador") {
            $scope.gridOptions.columnDefs = columComprador();
        } else if ($scope.usuario.perfil === "vendedor") {
            $scope.gridOptions.columnDefs = columVendedor();
        }

        // Activo la busqueda en todos los campos.
        $scope.gridOptions.enableFiltering = true;
        // Configuracion del idioma.
        i18nService.setCurrentLang('es');

        var datos;
        factoryGrilla.TraerTodos().
        then(function(respuesta) {
                $scope.gridOptions.data = respuesta;
            },
            function(error) {
                console.info(error);
            }
        );

        $scope.borrar = function(row) {
            factoryGrilla.borrar(row.id).
            then(function(respuesta) {
                    factoryGrilla.TraerTodos().
                    then(function(respuesta) {
                            $scope.gridOptions.data = respuesta;
                        },
                        function(error) {
                            console.info(error);
                        }
                    );
                },
                function(error) {
                    console.info(error);
                }
            );
        }

        $scope.borrarUsuario = function(row) {
            factoryGrilla.borrarUsuario(row.id).
            then(function(respuesta) {
                    factoryGrilla.TraerTodosUsuarios().
                    then(function(respuesta) {
                            $scope.gridOptions.data = respuesta;
                        },
                        function(error) {
                            console.info(error);
                        }
                    );
                },
                function(error) {
                    console.info(error);
                }
            );
        }

        $scope.ModificarUsuario = function(row) {
             factoryGrilla.ModificarUsuario(JSON.stringify(row)).
                then(function(respuesta) {
                        factoryGrilla.TraerTodosUsuarios().
                        then(function(respuesta) {
                                $scope.gridOptions.data = respuesta;
                            },
                            function(error) {
                                console.info(error);
                            }
                        );

                    },
                    function(error) {
                        console.info(error);
                    }
                );
             }


        $scope.Deslogearse = function() {

            $auth.logout();
            $scope.nada = "nada";
            $state.go("inicio");
        }

        /*
           factoryBandera.data().then(function(rta){
            // Cargo los datos en la grilla.
             $scope.gridOptions.data = rta;
           });

          console.log(uiGridConstants);*/
        if ($scope.usuario.perfil === "administrador") {
            factoryGrilla.TraerTodosUsuarios().
            then(function(respuesta) {
                $scope.gridOptions.data = respuesta;
            });
            $scope.gridOptions.columnDefs = columAdmin();
        }

function passwordEditor(clave, options)
{
$('<input type="password" required data-bind="value:' + options.field + '"/>').appendTo(clave);
};

    function columAdmin() {
        return [{
                field: 'id',
                name: 'id'
            }, {
                field: 'mail',
                 editable: true,
                 nullable: true,
                name: 'mail'
            }, {
                name: 'perfil',
                editDropdownOptionsArray: [
                  'administrador',
                  'vendedor',
                  'comprador'
                ]
              }, {
                field: 'nombre',
                name: 'nombre'
            },
             {  field:'clave',
                 key: 'clave',
                  type: 'clave',
                  templateOptions: {
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Password'
                    }
            },
            {
                width: 100,
                command: "destroy",
                cellTemplate: "<button ng-Click='grid.appScope.borrarUsuario(row.entity)'>BORRAR",
                name: "BORRAR"


            },{
            width: 100,
            cellTemplate: "<button ng-Click='grid.appScope.ModificarUsuario(row.entity)'>MODIFICAR",
            name: "MODIFICAR"

        }
        ];
    }

        function columComprador() {
            return [{
                    field: 'id',
                    name: 'id'
                }, {
                    field: 'nombre',
                    name: 'nombre'
                },{
                field: 'precio',
                name: 'precio'
            }

            ];
        }

        function columVendedor() {
            return [{
                field: 'id',
                name: 'id'
            }, {
                field: 'nombre',
                name: 'nombre'
            }, {
                field: 'precio',
                name: 'precio'
            },{
                width: 100,
                cellTemplate: "<button ng-Click='grid.appScope.borrar(row.entity)'>BORRAR",
                name: "BORRAR"

            }

            ];
        }

    })