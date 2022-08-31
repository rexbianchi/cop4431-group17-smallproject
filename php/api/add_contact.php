<?php
// Will contain utility functions
include_once("../util.php")

// Will contain config variables
$configs = include("../config.php")

$in_data = get_request_info();

$connection = new mysqli($configs['db_host'],
                    $configs['db_username'],
                   $configs['db_password'],
                   $configs['db_name']);

if($connection->connect_error){
    send_JSON_error($connection->connect_error);
    exit();
}


$statement = $mysqli->prepare("INSERT INTO Contact (user_id, first_name, last_name, email, phone_number) USING (?, ?, ?, ?);");
$statement->bind_param("issss", $in_data["first_name"], $in_data["last_name"], $in_data["username"], $in_data["password"]);

// If statement is successful, then return JSON response
if($statement->execute()) {
    send_JSON_response(""); 
}

// Otherwise, error has occured
else {
    send_JSON_error($statement->error);
}


$statement->close();
$connection->close();





		





















?>