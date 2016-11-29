/**
 * Created by ferna on 29/11/2016.
 */
app.controller('mapaClientesCtrl',function($scope, $http, $auth, $state,cargador)
{
    if($auth.isAuthenticated() && $auth.getPayload().tipo=="admin")
    {
        $scope.Listadomascotas={};

        $http.get('PHP/nexo.php', { params: {accion :"traerPedidosMapa"}})
            .then(function(respuesta) {
                $scope.Listadomascotas = respuesta.data.listado;
                console.log(respuesta.data);
            },function errorCallback(response) {
                $scope.Listadomascotas= [];
                console.log( response);
            });

    }else
    {
        $state.go("carta");

    }


});