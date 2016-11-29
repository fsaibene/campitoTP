<?php
require_once"accesoDatos.php";
class Local
{
//--ATRIBUTOS
    public $direccion;
    public $nombre;
    public $id_encargado;
    public $id;
    public $id_empleado1;
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
    public static function TraerUnLocal($id){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("select * from locales  where  id=:id");
        $consulta->bindValue(':id', $id, PDO::PARAM_STR);
        $consulta->execute();
        $personaBuscada= $consulta->fetchObject('Local');
        return $personaBuscada;
    }

    public static function TraerTodosLoslocales(){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        //$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
        $consulta =$objetoAccesoDato->RetornarConsulta("select id,direccion as direccion,nombre as nombre, id_encargado as id_encargado,id_empleado1 as id_empleado1  from locales");
        $consulta->execute();
        $arrEmpleado= $consulta->fetchAll(PDO::FETCH_CLASS, "Local");
        return $arrEmpleado;
    }

    public static function BorrarLocal($idParametro){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        //$consulta =$objetoAccesoDato->RetornarConsulta("delete from persona	WHERE id=:id");
        $consulta =$objetoAccesoDato->RetornarConsulta("delete 
				from locales 				
				WHERE id=:id");
        $consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);
        $consulta->execute();
        return $consulta->rowCount();
    }
    public static function ModificarLocal($Local){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("
				update locales
				set nombre=:nombre,
				direccion=:direccion,
				id_encargado=:id_encargado,
				id_empleado1=:id_empleado1
				WHERE id=:id");
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta->bindValue(':id',$Local->id, PDO::PARAM_INT);
        $consulta->bindValue(':nombre',$Local->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':direccion', $Local->direccion, PDO::PARAM_STR);
        $consulta->bindValue(':id_encargado', $Local->direccion, PDO::PARAM_STR);
        $consulta->bindValue(':id_empleado1', $Local->id_empleado1, PDO::PARAM_STR);
        return $consulta->execute();
    }

    public static function InsertarLocal($Local){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        //$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Local (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into locales (direccion,nombre,id_encargado,id_empleado1, id_empleado2)values(:direccion,:nombre,:id_encargado,:id_empleado1, :id_empleado2)");
        $consulta->bindValue(':nombre',$Local->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':direccion', $Local->direccion, PDO::PARAM_STR);
        $consulta->bindValue(':id_encargado', $Local->id_encargado, PDO::PARAM_STR);
        $consulta->bindValue(':id_empleado1', $Local->id_empleado1, PDO::PARAM_STR);
        $consulta->bindValue(':id_empleado2', $Local->id_empleado2, PDO::PARAM_STR);
        $consulta->execute();
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
}
