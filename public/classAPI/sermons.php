<?php
// echo 'TESTING';
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods: *');

include 'DbConnect.php';

$objDb = new DbConnect;
$conn =  $objDb->connect();


$method = $_SERVER['REQUEST_METHOD'];
switch($method){
    case 'GET':
        $sql = 'SELECT * FROM sermons ORDER BY id DESC';
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[4]) && $path[4] == 'latest'){
            $sql .= ' LIMIT 1';
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $sermons = $stmt->fetch(PDO::FETCH_ASSOC);
        }else{
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $sermons = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($sermons);
        break;
}