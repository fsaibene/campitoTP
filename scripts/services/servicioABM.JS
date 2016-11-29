angular
  .module('miApp').service('ABM', function ($http,factoryRutas) {
        
var Url = factoryRutas.ApiUrl;

  this.InsertarUsuario = InsertarUsuario;
  function InsertarUsuario(objeto){
console.log(objeto);
    return $http.post(Url + "usuarios/alta/" + objeto)
      .then(function(respuesta) { 
       return respuesta.data

    })      // FIN DEL RETURN


  }//FIN IF QUE TRAER CLIENTES

    this.TraerObjeto = TraerObjeto;
  function TraerObjeto(objeto){

    return $http.get(Url + "usuarios/validar/"+ objeto)
      .then(function(respuesta) { 
      console.info(respuesta.data);    
       return respuesta.data

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

   



  })