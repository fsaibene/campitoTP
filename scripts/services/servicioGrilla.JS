angular
  .module('miApp').service('Grilla', function ($http,factoryRutas) {
    var Url = factoryRutas.ApiUrl;

    this.borrar = borrar;
    this.TraerTodos = TraerTodos;
    this.TraerTodosUsuarios = TraerTodosUsuarios;
    this.borrarUsuario = borrarUsuario;
    this.ModificarUsuario=ModificarUsuario;
         function TraerTodos(){
              return $http.get(Url + "productos/traertodos/")
              .then(function(respuesta) { 
                console.log("respuesta");
               return respuesta.data
        
            })      // FIN DEL RETURN
        } // FIN DE TRTAER TODOS LOS PRODUCTOS
        
        function borrar(obj){
              return $http.delete(Url + "productos/borrar/" + obj)
              .then(function(respuesta) { 
               return respuesta.data
        
            })      // FIN DEL RETURN
        } // FIN DE BORRAR USUARIO FIN DE BORRAR PRODUCTOS
        
         function TraerTodosUsuarios(){
              return $http.get(Url + "usuarios/traertodos/")
              .then(function(respuesta) { 
               return respuesta.data
        
            })      // FIN DEL RETURN
        }// FIN DE TRAER TODOS
        
        
         function borrarUsuario(obj){
          console.log(obj);
              return $http.get(Url + "usuarios/borrar/" + obj)
              .then(function(respuesta) { 
               return respuesta.data
        
            })      // FIN DEL RETURN
        
        
        }// FIN DE BORRAR USUARIO
            
         function ModificarUsuario(obj){
              return $http.post(Url + "usuarios/modificar/" + obj)
              .then(function(respuesta) {
              console.info(respuesta); 
               return respuesta.data
            })      // FIN DEL RETURN
         }// FIN DE
})//cierro factory
