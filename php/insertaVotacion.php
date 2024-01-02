<?php
require_once 'conexion.php'; 

if(isset($_POST)){
    $data = file_get_contents("php://input");
    $voto = json_decode($data,true);
    $respuesta = array(
        "status" => "error",
        "mensage" => "Ha Ocurrido un Error al Realizar la Votación."
    );
    $Tie_web = 0;
    $Tie_tv = 0;
    $Tie_red = 0;
    $Tie_amigo = 0;
    

    if($voto["ckWeb"]=="true") $Tie_web = 1;
    if($voto["ckTv"]=="true") $Tie_tv = 1;
    if($voto["ckRed"]=="true") $Tie_red = 1;
    if($voto["ckAmigo"]=="true") $Tie_amigo = 1;
      
    $nombre = trim($voto["nombre"]);
    $alias = trim($voto["alias"]);
    $rut= trim($voto["rut"]);
    $email= trim($voto["email"]);
    $region= trim($voto["region"]);
    $comuna= trim($voto["comuna"]);
    $candidato= trim($voto["candidato"]);

    $sql_val_rut = "select count(*) as val_rut from votacion where rut = '".$rut."'";
    $val_rut= mysqli_query($db,$sql_val_rut);
    $valida = mysqli_fetch_assoc($val_rut);
    if(isset($valida) && $valida["val_rut"] == 0){
        $_Sql_Insert = "insert into votacion(Id,Nombre, Alias, Rut, Email, RegionId, ComunaId, CandidatoId, Tie_web, Tie_tv, Tie_red, Tie_amigo) VALUES (null,'$nombre','$alias','$rut','$email',$region,$comuna,$candidato,$Tie_web,$Tie_tv,$Tie_red,$Tie_amigo)";
        $guardar = mysqli_query($db, $_Sql_Insert);
        
        
        if($guardar){
            $sql_val_rut = "select count(*) as val_rut from votacion where rut = '".$rut."'";
            $val_rut= mysqli_query($db,$sql_val_rut);
            $valida = mysqli_fetch_assoc($val_rut);
            if(isset($valida) && $valida["val_rut"] > 0){
                $respuesta["status"] = "OK";
                $respuesta["mensage"] = "Ingreso de Votación Realizado Correctamente.";  
            }    
           
        }
        

    } else {
        $respuesta["status"] = "error";
        $respuesta["mensage"] = "Ya Realizada una Votación con el Rut Entregado.";
    } 

    echo json_encode($respuesta);


     

}



