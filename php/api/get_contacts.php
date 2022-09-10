<?php
// Will contain utility functions
include_once("../util.php");

// Show errors
ini_set('display_errors', 1);

// Will contain config variables
$configs = include("../config.php");

$in_data = get_request_info();
$row_offset = 0; // 0, 10, 20, etc...
$default_amt = 10;
$page = $in_data['page'];
$search_term = "%".$in_data["search"]."%";

// If page is not null, set row_offset, else row_offset = 0
if(!(is_null($page))) {
    $row_offset = intval($page) * 10;
}

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

// If "search" parameter is null -> return default load
if(is_null($search_term)) {
    $statement = $connection->prepare("SELECT FirstName, LastName, Email, PhoneNumber, Id FROM Contacts ORDER BY Id LIMIT ?,?");
    $statement->bind_param("ii", $row_offset, $default_amt);
    $statement->execute();
    $result = $statement->get_result();

    $id = $in_data["id"];
    $search_results = array();
    while($row = $result->fetch_assoc()) {
        array_push($search_results, $row);
    }

    if($row = $result->fetch_assoc()) {
        send_JSON_error($statement->error);
    }
    else {
        send_JSON_response($search_results); 
    }

}
// If "search" parameter is not null -> return search
else {
    $statement = $connection->prepare("SELECT FirstName, LastName, Email, PhoneNumber, Id FROM Contacts WHERE FirstName like ? AND UserId = ? OR LastName like ? AND UserId = ?");
    $statement->bind_param("ssss", $search_term , $in_data["id"], $search_term, $in_data["id"]);
    $statement->execute();
    $result = $statement->get_result();
    
    $id = $in_data["id"];
    
    $search_results = array();
    
    while($row = $result->fetch_assoc()) {
        array_push($search_results, $row);
    }
    
    if(is_null($id)) {
        send_JSON_error($statement->error);
    }
    else {
        send_JSON_response($search_results); 
    }

}


$statement->close();
$connection->close();
?>
