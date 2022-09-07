<?php
// Will contain utility functions
include_once("../util.php");

// Show errors
ini_set('display_errors', 1);

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

$statement = $connection->prepare("INSERT INTO Users (FirstName, LastName, Login, Password) USING (?, ?, ?, ?);");
$statement->bind_param("ssss", $in_data["first_name"], $in_data["last_name"], $in_data["username"], $in_data["password"]);

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