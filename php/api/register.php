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

// Database connection test
if($connection->connect_error)
{
    send_JSON_error($connection->connect_error);
    exit();
}


$statement = $mysqli->prepare("INSERT INTO User (first_name, last_name, email, password) USING (?, ?, ?, ?);");
$statement->bind_param("ssss", $in_data["first_name"], $in_data["last_name"], $in_data["username"], $in_data["password"]);
$statement->execute();

// if($statement->error)

// Only need to return that it was successful
send_JSON_response("");

// Close DB connections
$statement->close();
$connection->close();


/*
// Check for response from DB
if($row = $result->fetch_assoc())
{
    send_JSON_response($row);
}

// If no response, then send error response
else 
{
    send_JSON_error("");
}

*/


?>