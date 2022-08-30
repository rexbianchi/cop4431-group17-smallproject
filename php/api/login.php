<?php
// Will contain utility functions
include_once("../util.php");

// Will contain config variables
$configs = include("../config.php");

$in_data = get_request_info();

$connection = new mysqli($configs['db_host'],
                   $configs['db_username'],
                   $configs['db_password'],
                   $configs['db_name']);

// 
if($connection->connect_error)
{
    send_JSON_error($connection->connect_error);
    exit();
}


$statement = $mysqli->prepare("SELECT id, first_name, last_name FROM User WHERE username = ? AND password= ?;");
$statement->bind_param("ss", $in_data["username"], $in_data["password"]);
$statement->execute();
$result = $statement->get_result();

// Check for response from DB
if($row = $result->fetch_assoc())
{
    send_JSON_response($row);
}

// If no response, then send error response
else 
{
    send_JSON_error("No Records Found");
}

// Close DB connections
$statement->close();
$connection->close();
?>