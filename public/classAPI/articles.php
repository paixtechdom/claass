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
        $sql = 'SELECT * FROM articles';
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[4]) && $path[4] == 'latest'){
            $sql .= ' ORDER BY id DESC LIMIT 1';
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $articles = $stmt->fetch(PDO::FETCH_ASSOC);
        }elseif(isset($path[4])){
            $sql .= ' WHERE id = :id';
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[4]);
            $stmt->execute();
            $articles = $stmt->fetch(PDO::FETCH_ASSOC);
        }else{
            $sql .= ' ORDER BY id DESC';
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($articles);
        break;

}