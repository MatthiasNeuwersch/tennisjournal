<?php
include("./../db_config.php");
$connection = new mysqli($GLOBALS["servername"], $GLOBALS["username"], $GLOBALS["password"], $GLOBALS["dbname"]);
if ($connection->connect_error)
    die("Connection failed: " . $connection->connect_error);
mysqli_set_charset($connection,"utf8");

if(isset($_REQUEST["purpose"])) {
    switch ($_REQUEST["purpose"]) {
        case "Login":
            login($connection);
            break;
        case "getMatches":
            getMatches($connection);
            break;
        case "getPlayers":
            getPlayers($connection);
            break;
        default:
            die("Unknown Purpose: "+$_REQUEST["purpose"]);
    }
}

function login($connection){
    $data = json_decode($_REQUEST["data"]);
    $query = "SELECT id, email, firstname, lastname, oetv_license FROM users WHERE email = '".$data->email."' AND password = '".sha1($data->password)."'";
    $userdata = $connection->query($query);
    if($userdata->num_rows>0){
        $user = $userdata->fetch_assoc();
        die(json_encode($user));
    }else
        die("false");
}

function getMatches($connection){
    $data = json_decode($_REQUEST["data"]);
    $matches = $connection->query("SELECT * from matches WHERE owner = '".$data->id."' ORDER BY date DESC");
    if($matches->num_rows>0)
        die(json_encode($matches->fetch_all(MYSQLI_ASSOC)));
    else
        die("No Matches found");
}

function getPlayers($connection){
    $data = json_decode($_REQUEST["data"]);
    $matches = $connection->query("SELECT * from players WHERE owner = '".$data->id."'");
    if($matches->num_rows>0)
        die(json_encode($matches->fetch_all(MYSQLI_ASSOC)));
    else
        die("No Matches found");
}