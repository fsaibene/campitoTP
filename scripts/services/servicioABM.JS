angular
  .module('miApp').service('ABM', function ($http,factoryRutas) {
        
    var Url = factoryRutas.ApiUrl;

    this.InsertarUsuario = InsertarUsuario;
    this.InsertarLocal = InsertarLocal;
    this.InsertarInmueble = InsertarInmueble;
    this.TraerObjeto = TraerObjeto;
    this.BorrarObjeto = BorrarObjeto;
    this.TraerTodosLosEmpleados = TraerTodosLosEmpleados;
    this.TraerTodosLosEncargados = TraerTodosLosEncargados;
    this.TraerTodosLosLocales = TraerTodosLosLocales;
    this.ApiArchivos = ApiArchivos;


    function InsertarUsuario(objeto){
        return $http.post(Url + "usuarios/alta/" + objeto)
            .then(function(respuesta) {
                return respuesta.data
            })
     }
    function InsertarLocal(objeto){
        return $http.post(Url + "locales/alta/" + objeto)
            .then(function(respuesta) {
                return respuesta.data
            })
    }
    function InsertarInmueble(objeto){
        return $http.post(Url + "inmuebles/alta/" + objeto)
            .then(function(respuesta) {
                return respuesta.data
            })
    }
    function TraerObjeto(objeto){
        return $http.get(Url + "usuarios/validar/"+ objeto)
            .then(function(respuesta) {
                  console.info(respuesta.data);
                return respuesta.data
            })
    };
    function TraerTodosLosEmpleados(){
        return $http.get(Url + "usuarios/traerEmpleados/")
            .then(function(respuesta) {
                return respuesta.data
            })
    };
    function TraerTodosLosEncargados(){
        return $http.get(Url + "usuarios/traerEncargados/")
            .then(function(respuesta) {
                return respuesta.data
            })
    };   
    function TraerTodosLosLocales(){
        return $http.get(Url + "locales/traerLocales/")
            .then(function(respuesta) {
                return respuesta.data
            })
    };
    function BorrarObjeto(id){
        console.info(id);
        return $http.delete(Url + "personas/" + id)
            .then(function(respuesta) {
                return TraerTodos();
            });
    };
    function ApiArchivos(){
        return factoryRutas.ApiUrl + "archivos";
    }
});