<?php
$server = "localhost";
$username = "administrador";
$password = "administrador";
$database = "sistema_votacion";
$db = mysqli_connect($server,$username,$password,$database);
mysqli_query($db, "SET NAMES 'utf8'");
