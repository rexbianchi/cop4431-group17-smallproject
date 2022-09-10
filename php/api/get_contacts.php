<?php
// Will contain utility functions
include_once("../util.php");

// Show errors
ini_set('display_errors', 1);

// Will contain config variables
$configs = include("../config.php");

$in_data = get_request_info();
$default_load = $page * 10;
// 'search' - String to search for (can be null)
// Number of contacts to return / pagination (can be null)

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

$search_term = "%".$in_data["search"]."%";

// If "search" parameter is null -> return default load
if(is_null($search_term)) {
    $statement = $connection->prepare("SELECT FirstName, LastName, Email, PhoneNumber, Id FROM Contacts ORDER BY Id LIMIT ?");
    $statement->bind_param("i", $default_load);
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

// while($row = $result->fetch_assoc()) {
//     if( $searchCount > 0 ) {
//         $searchResults .= ",";
//     }
//     $searchCount++;
//     $searchResults .= $row["FirstName"] . ' ' . $row["LastName"];
// }