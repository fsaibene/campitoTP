angular
    .module('miApp').service('Login', function ($http,factoryRutas) {

    var Url = factoryRutas.ApiUrl;
    this.validarLogin = validarLogin;
    function validarLogin(objeto){
        return $http.get(Url + "/usuarios/validar/" + objeto)
        .then(function(respuesta) {
            console.info(respuesta);
            return respuesta.data
        })
    }//FIN IF QUE TRAER CLIENTES
    this.TraerObjeto = TraerObjeto;
    function TraerObjeto(objeto){
        return $http.get(Url +"/usuarios/traer/"+ objeto)
        .then(function(respuesta) {
            console.info(respuesta);
            return respuesta.data;
        })
    }
    
    this.BorrarObjeto = BorrarObjeto;

    function BorrarObjeto(id){
        console.info(id);
        return $http.delete(Url + "personas/" + id)
        .then(function(respuesta) {
            return TraerTodos();
        });
    };

});