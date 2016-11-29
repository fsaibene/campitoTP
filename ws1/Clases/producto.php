<?php
require_once"accesoDatos.php";
class Producto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
	public $precio;
	
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	

	
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($dni=NULL)
	{
		if($dni != NULL){
			$obj = Persona::TraerUnaPersona($dni);
			
			$this->apellido = $obj->apellido;
			$this->nombre = $obj->nombre;
			$this->dni = $dni;
			$this->foto = $obj->foto;
			
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->apellido."-".$this->nombre."-".$this->dni."-".$this->foto;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnUsuario($usuario) 
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuario u  join rol r on u.id_rol = r.id_rol where u.nombre_usuario =:nombre_usuario");
		$consulta->bindValue(':nombre_usuario', $usuario, PDO::PARAM_STR);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('Usuario');
		return $personaBuscada;	
					
	}
	
	public static function TraerTodos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
	$consulta =$objetoAccesoDato->RetornarConsulta("select id,nombre as nombre,precio as precio from producto");
		$consulta->execute();			
		$arrEmpleado= $consulta->fetchAll(PDO::FETCH_CLASS, "Producto");	
		return $arrEmpleado;
	}
	
	public static function borrar($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("delete from persona	WHERE id=:id");	
		$consulta =$objetoAccesoDato->RetornarConsulta("delete 
				from producto 				
				WHERE id=:id");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarPersona($persona)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update persona 
				set nombre=:nombre,
				apellido=:apellido,
				foto=:foto
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id',$persona->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':apellido', $persona->apellido, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function Insertar($producto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into producto (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into producto (nombre,precio)values(:nombre,:precio)");
		$consulta->bindValue(':nombre',$producto->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':precio',$producto->precio, PDO::PARAM_INT);

		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//





}
