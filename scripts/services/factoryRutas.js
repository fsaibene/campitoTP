angular
  .module('miApp')
  .factory('factoryRutas', function () {
    //var Url = 'http://www.egos27.somee.com/api/bandera';
    var objeto = {};
    objeto.nombre = "Factory de Rutas";
    objeto.ApiBanderas = 'http://www.egos27.somee.com/api/bandera';
    return objeto;
  })
