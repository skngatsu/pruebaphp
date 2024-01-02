<?php
require_once 'conexion.php'; 

if(isset($_POST)){
    $data = file_get_contents("php://input");
    $region = json_decode($data,true);
    

     $Id = $region["id"];
     $sql_comuna = "select c.Id,c.Nombre from comunas c INNER JOIN regiones r ON c.regionId = r.Id WHERE r.Id = $Id";
     $comuna = mysqli_query($db,$sql_comuna);
     $myArray = array();
     while($row = mysqli_fetch_assoc($comuna)) {
         $myArray[] = $row;
     }
        
     echo json_encode($myArray);

}

