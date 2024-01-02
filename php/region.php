<?php
require_once 'conexion.php'; 
$sql_categorias = "select Id,Nombre from regiones order by Id asc";
$region = mysqli_query($db,$sql_categorias);
$myArray = array();
while($row = mysqli_fetch_assoc($region)) {
    $myArray[] = $row;
}
   
echo json_encode($myArray);