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
        $sql = 'SELECT * FROM images ORDER BY id DESC';
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && $path[3] == 'latest') {
            $sql .= ' LIMIT :m';
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':m', $path[4], PDO::PARAM_INT);
            $stmt->execute();
            $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }else{
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($images);     
        break;
    
}