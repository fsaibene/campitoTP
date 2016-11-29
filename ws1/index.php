<?php
require_once('Clases/AccesoDatos.php');
require_once('Clases/personas.php');
require_once('Clases/producto.php');

require 'vendor/autoload.php';

$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];

$c = new \Slim\Container($configuration);
$app = new \Slim\App($c);
$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});
$app->get('/usuarios/validar/{objeto}', function ($request, $response, $args) {

  $usuario=json_decode($args['objeto']);

   $validador = false;   
   $arrAdmin = Usuario::TraerTodosLosUsuarios();
   foreach ($arrAdmin as $adm) {
        if($adm->mail == $usuario->mail)
            if($adm->nombre == $usuario->nombre)
            if($adm->clave == $usuario->clave)
                 $validador=true;
   }
   echo  $validador;
});
$app->get('/usuarios/traer/{objeto}', function ($request, $response, $args) {

  $usuario=json_decode($args['objeto']);
  $usuarioBuscado=Usuario::TraerUnUsuario($usuario->mail);
 return json_encode($usuarioBuscado);
    
});

$app->post('/usuarios/alta/{objeto}', function ($request, $response, $args) {
  $usuario=json_decode($args['objeto']);
  $usuarioBuscado=Usuario::InsertarUsuario($usuario);
 return json_encode($usuarioBuscado);
    
});

$app->post('/usuarios/modificar/{obj}', function ($request, $response, $args) {
  $usuario=json_decode($args['obj']);
  $usuarioBuscado=Usuario::ModificarUsuario($usuario);
 return json_encode($usuarioBuscado);
});

$app->get('/usuarios/borrar/{objeto}', function ($request, $response, $args) {
  $usuario=json_decode($args['objeto']);
  $usuarioBuscado=Usuario::BorrarUsuario($usuario);
 return json_encode($usuarioBuscado);
});

$app->get('/usuarios/traertodos/', function ($request, $response, $args) {
  $datos=Usuario::TraerTodosLosUsuarios();
 return json_encode($datos);
});

$app->post('/productos/alta/{objeto}', function ($request, $response, $args) {
  $producto=json_decode($args['objeto']);
  $usuarioBuscado=Producto::Insertar($producto);
 return json_encode($usuarioBuscado); 
});
$app->get('/productos/traertodos/', function ($request, $response, $args) {
  $arrProductos=Producto::TraerTodos();
 return json_encode($arrProductos);
    
});

$app->delete('/productos/borrar/{id}', function ($request, $response, $args) {
  $arrProductos=Producto::Borrar($args['id']);
 return json_encode($arrProductos);
});
/* POST: Para crear recursos */

$app->post('/archivos', function ($request, $response, $args) {
    
    if ( !empty( $_FILES ) ) {
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = "fotos" . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $tempPath, $uploadPath );
    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer );
} else {
    echo 'No files';
}
    return $response;
});

// /* PUT: Para editar recursos */
$app->put('/personas/{objeto}', function ($request, $response, $args) {
    $persona=json_decode($args['objeto']);
    if($persona->foto != "pordefecto.png"){
                        
        $rutaVieja="fotos/".$persona->foto;
        $rutaNueva=$persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "fotos/".$rutaNueva);
        unlink($rutaVieja);
        $persona->foto="http://localhost:81/Laboratorio-IV-2016/Clase.07/ws1/fotos/".$rutaNueva;            
    }
    return $response->write(Persona::ModificarPersona($persona));

});

// /* DELETE: Para eliminar recursos */
$app->delete('/personas/{id}', function ($request, $response, $args) {
    return $response->write(Persona::BorrarPersona($args['id']));
});
/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
