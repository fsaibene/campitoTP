angular
    .module('miApp')
    .controller('altaInmuebles', function($scope, $auth, $state,ABM, cargadorDeFoto, FileUploader) {
        $scope.uploader = new FileUploader({url:'ws1/archivos.php'});
        ABM.TraerTodosLosLocales().then(function (response) {
            $scope.locales = response;
        });
        $scope.nada = "nada";
        $scope.user = {};
        $scope.user.foto = "pordefecto.png";
        cargadorDeFoto.CargarFoto($scope.user.foto, $scope.uploader);
        $scope.usuario = {};
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
            if($scope.uploader.queue[0]!=undefined && $scope.uploader.queue[0]._file.name!="pordefecto.png")
            {
                var nombreFoto = $scope.uploader.queue[0]._file.name;
                $scope.user.foto=nombreFoto;
                $scope.uploader.uploadAll();
            }
            $scope.user = JSON.stringify($scope.user);
            console.log($scope.user);
            ABM.InsertarInmueble($scope.user)
                .then(function(respuesta) {
                    // console.log(respuesta);
                    $state.go("altaInmuebles");
                });
        }
    })/**
 * Created by ferna on 28/11/2016.
 */
/**
 * Created by ferna on 29/11/2016.
 */
