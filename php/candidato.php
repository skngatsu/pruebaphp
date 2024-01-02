<?php
require_once 'conexion.php'; 

if(isset($_POST)){
    $data = file_get_contents("php://input");
    $comuna = json_decode($data,true);
    

     $Id = $comuna["id"];
     $sql_candidato = "select c.Id,c.Nombre from candidato c INNER JOIN comunas co ON c.ComunaId = co.Id WHERE co.Id = $Id";
     $candidato = mysqli_query($db,$sql_candidato);
     $myArray = array();
     while($row = mysqli_fetch_assoc($candidato)) {
         $myArray[] = $row;
     }
        
     echo json_encode($myArray);

}


