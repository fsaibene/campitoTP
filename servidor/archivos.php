<?php
echo "hola";
if ( !empty( $_FILES ) ) {

$json = [];
	foreach ($_FILES as $FILE) {
	
    $tempPath = $FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath =  dirname(__DIR__).DIRECTORY_SEPARATOR  . "fotos" . DIRECTORY_SEPARATOR . $FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $tempPath, $uploadPath );
    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer );
    
} else {
    $json = 'No files';
}

var_dump($json);
}
?>