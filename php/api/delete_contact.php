<?php
// Will contain utility functions
include_once("../util.php");

// Will contain config variables
$configs = include("../config.php");

// Show errors
ini_set('display_errors', 1);

$in_data = get_request_info();

$connection = new mysqli($configs['db_host'],
                    $configs['db_username'],
                   $configs['db_password'],
                   $configs['db_name']);

if($connection->connect_error){
    send_JSON_error($connection->connect_error);
    exit();
}


$statement = $connection->prepare(
    "DELETE FROM Contacts
     WHERE Id = ?");
$statement->bind_param("i", $in_data["Id"]);

// If statement is successful, then return JSON response
if($statement->execute()) {
    send_JSON_response("Contact deleted successfully!"); 
}

// Otherwise, error has occured
else {
    send_JSON_error($statement->error);
}


$statement->close();
$connection->close();
?>