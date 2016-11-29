<?php
require_once"accesoDatos.php";
class Usuario
{
//--ATRIBUTOS
	public $mail;
	public $nombre;
	public $clave;
	public $id;
	public $perfil;
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

//--TOSTRING
  	public function ToString(){
	  	return $this->apellido."-".$this->nombre."-".$this->dni."-".$this->foto;
	}
//--METODO DE CLASE
	public static function TraerUnUsuario($mail){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios  where  mail=:mail");
		$consulta->bindValue(':mail', $mail, PDO::PARAM_STR);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('Usuario');
		return $personaBuscada;	
	}
	
	public static function TraerTodosLosUsuarios(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
		$consulta =$objetoAccesoDato->RetornarConsulta("select id,mail as mail,nombre as nombre, clave as clave,perfil as perfil  from usuarios");
		$consulta->execute();			
		$arrEmpleado= $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");	
		return $arrEmpleado;
	}
	
	public static function BorrarUsuario($idParametro){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("delete from persona	WHERE id=:id");	
		$consulta =$objetoAccesoDato->RetornarConsulta("delete 
				from usuarios 				
				WHERE id=:id");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
	}
	public static function ModificarUsuario($usuario){
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update usuarios
				set nombre=:nombre,
				mail=:mail,
				clave=:clave,
				perfil=:perfil
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id',$usuario->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':mail', $usuario->mail, PDO::PARAM_STR);
			$consulta->bindValue(':clave', $usuario->mail, PDO::PARAM_STR);
			$consulta->bindValue(':perfil', $usuario->perfil, PDO::PARAM_STR);
			return $consulta->execute();
	}

	public static function InsertarUsuario($usuario){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuario (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuarios (mail,nombre,clave,perfil)values(:mail,:nombre,:clave,:perfil)");
		$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':mail', $usuario->mail, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $usuario->clave, PDO::PARAM_STR);
		$consulta->bindValue(':perfil', $usuario->perfil, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}

	public static function TraerPersonasTest(){
		$arrayDePersonas=array();

		$persona = new stdClass();
		$persona->id = "4";
		$persona->nombre = "rogelio";
		$persona->apellido = "agua";
		$persona->dni = "333333";
		$persona->foto = "333333.jpg";

		//$objetJson = json_encode($persona);
		//echo $objetJson;
		$persona2 = new stdClass();
		$persona2->id = "5";
		$persona2->nombre = "Bañera";
		$persona2->apellido = "giratoria";
		$persona2->dni = "222222";
		$persona2->foto = "222222.jpg";

		$persona3 = new stdClass();
		$persona3->id = "6";
		$persona3->nombre = "Julieta";
		$persona3->apellido = "Roberto";
		$persona3->dni = "888888";
		$persona3->foto = "888888.jpg";

		$arrayDePersonas[]=$persona;
		$arrayDePersonas[]=$persona2;
		$arrayDePersonas[]=$persona3;
		return  $arrayDePersonas;
	}
}
