<?php
require_once"accesoDatos.php";
class Inmueble
{
//--ATRIBUTOS
    public $calle;
    public $altura;
    public $localidad;
    public $id;
    public $foto;
//--CONSTRUCTOR
    public function __construct($dni=NULL)
    {
        if($dni != NULL){
            $obj = Persona::TraerUnaPersona($dni);
            $this->apellido = $obj->apellido;
            $this->altura = $obj->altura;
            $this->dni = $dni;
            $this->foto = $obj->foto;
        }
    }

//--TOSTRING
    public function ToString(){
        return $this->apellido."-".$this->altura."-".$this->dni."-".$this->foto;
    }
//--METODO DE CLASE
    public static function TraerUnInmueble($calle){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("select * from inmuebles  where  calle=:calle");
        $consulta->bindValue(':calle', $calle, PDO::PARAM_STR);
        $consulta->execute();
        $personaBuscada= $consulta->fetchObject('Inmueble');
        return $personaBuscada;
    }

    public static function TraerTodosLosInmuebles(){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        //$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
        $consulta =$objetoAccesoDato->RetornarConsulta("select id,calle as calle,altura as altura, localidad as localidad,foto as foto  from inmuebles");
        $consulta->execute();
        $arrEmpleado= $consulta->fetchAll(PDO::FETCH_CLASS, "Inmueble");
        return $arrEmpleado;
    }


    public static function BorrarInmueble($idParametro){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        //$consulta =$objetoAccesoDato->RetornarConsulta("delete from persona	WHERE id=:id");
        $consulta =$objetoAccesoDato->RetornarConsulta("delete 
				from inmuebles 				
				WHERE id=:id");
        $consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);
        $consulta->execute();
        return $consulta->rowCount();
    }
    public static function ModificarInmueble($Inmueble){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("
				update inmuebles
				set altura=:altura,
				calle=:calle,
				localidad=:localidad,
				foto=:foto
				WHERE id=:id");
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta->bindValue(':id',$Inmueble->id, PDO::PARAM_INT);
        $consulta->bindValue(':altura',$Inmueble->altura, PDO::PARAM_STR);
        $consulta->bindValue(':calle', $Inmueble->calle, PDO::PARAM_STR);
        $consulta->bindValue(':localidad', $Inmueble->calle, PDO::PARAM_STR);
        $consulta->bindValue(':foto', $Inmueble->foto, PDO::PARAM_STR);
        return $consulta->execute();
    }

    public static function InsertarInmueble($Inmueble){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        //$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Inmueble (altura,apellido,dni,foto)values(:altura,:apellido,:dni,:foto)");
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into inmuebles (calle,altura,localidad,foto)values(:calle,:altura,:localidad,:foto)");
        $consulta->bindValue(':altura',$Inmueble->altura, PDO::PARAM_STR);
        $consulta->bindValue(':calle', $Inmueble->calle, PDO::PARAM_STR);
        $consulta->bindValue(':localidad', $Inmueble->localidad, PDO::PARAM_STR);
        $consulta->bindValue(':foto', $Inmueble->foto, PDO::PARAM_STR);
        $consulta->execute();
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
    
}
