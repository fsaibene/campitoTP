angular
    .module('miApp')
        .service('cargadorDeFoto', function($http, FileUploader){
            this.CargarFoto=function(nombreFoto, uploader) {
                var direccion="./fotos/"+nombreFoto;
                $http.get(direccion, {responseType: "blob"})
                .then(function(respuesta){
                    var mimeType=respuesta.data.type;
                    var archivo=new File([respuesta.data], direccion, {type:mimeType});
                    var dummy=new FileUploader.FileItem(uploader, {});
                    dummy._file=archivo;
                    dummy.file={};
                    dummy.file=new File([respuesta.data], nombreFoto, {type:mimeType});
                    uploader.queue.push(dummy);
                });
            };
        });
