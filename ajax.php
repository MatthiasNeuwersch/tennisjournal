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
        case "addMatch":
            addMatch($connection);
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

function addMatch($connection){
    $data = json_decode($_REQUEST["data"]);
    $data->date = "'".date("Y-m-d H:i:s", strtotime($data->date))."'";
    $keys = ["owner", "date", "matchtype", "itn_match", "myITN","player2","player2ITN", "surface","balls","notes"];
    $values = [$data->owner, $data->date, "'".($data->matchtype)."'", $data->itn_match, $data->myITN, $data->player2, $data->player2ITN, "'".$data->surface."'", "'".$data->balls."'", "'".$data->notes."'"];

    for($i = 1; $i <= 5; $i++){
        if(!empty($data->{"set".$i."Team1"})) {
            $keys[] = "set" . $i . "Team1";
            $keys[] = "set" . $i . "Team2";
            $values[] = $data->{"set".$i."Team1"};
            $values[] = $data->{"set".$i."Team2"};
        }
    }
    $keys = join(", ", $keys);
    $values = join (", ", $values);
    $query = "INSERT INTO matches (".$keys.") values (".$values.");";
    $match = $connection->query($query);
    if($match)
        die(json_encode($connection->insert_id));
    else
        die("NIX");
//        die($query);

}

function getPlayers($connection){
    $data = json_decode($_REQUEST["data"]);
    $matches = $connection->query("SELECT * from players WHERE owner = '".$data->id."'");
    if($matches->num_rows>0)
        die(json_encode($matches->fetch_all(MYSQLI_ASSOC)));
    else
        die("No Matches found");
}