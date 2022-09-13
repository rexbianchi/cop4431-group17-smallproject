<?php
// Will contain utility functions
include_once("../util.php");

// Show errors
ini_set('display_errors', 1);

// Will contain config variables
$configs = include("../config.php");

// Get query data : (Parameters [ID] [PAGE] [SEARCH])
$in_data = get_query_params();
$id = $in_data['id'];
$page = $in_data['page'];
if(in_array('search', $in_data)) {
    $search_term = "%".$in_data['search']."%";
}
$row_offset = 0; // 0, 10, 20, etc...
$default_amt = 3;

// If page is not null, set row_offset, else row_offset = 0
if(!(is_null($page))) {
    $row_offset = (intval($page)-1);
    if($row_offset == -1 || $row_offset == 0) { // page = 0 or 1
        $row_offset = 0;
    }
    else { // page = 2,3,4,etc
        $row_offset *= $default_amt; 
    }
}

// Connect to database
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

// If "search" parameter is not set or null -> return default_amt of rows @ page x
if(!isset($search_term)) { 
    $statement = $connection->prepare("SELECT FirstName, LastName, Email, PhoneNumber, Id FROM Contacts ORDER BY FirstName LIMIT ?,?");
    $statement->bind_param("ii", $row_offset, $default_amt);
    $statement->execute();
    $result = $statement->get_result();

    $search_results = array();
    while($row = $result->fetch_assoc()) {
        array_push($search_results, $row);
    }

    $test = "TESTING MOTHERFUCKER";
    array_push($search_results, $test);

    if($row = $result->fetch_assoc()) {
        send_JSON_error($statement->error);
    }
    else {
        send_JSON_response($search_results); 
    }

}
// If "search" parameter is not null -> return search results
else {
    $statement = $connection->prepare("SELECT FirstName, LastName, Email, PhoneNumber, Id FROM Contacts WHERE FirstName like ? AND UserId = ? OR LastName like ? AND UserId = ? ORDER BY FirstName LIMIT ?, ?");
    $statement->bind_param("ssssii", $search_term , $in_data["id"], $search_term, $in_data["id"], $row_offset, $default_amt);
    $statement->execute();
    $result = $statement->get_result();
        
    $search_results = array();
    $count = 0;
    while($row = $result->fetch_assoc()) {
        array_push($search_results, $row);
        $count++;
        if($count > $default_amt) {
            // TODO : implement pagination somehow - maybe a show more button?
        }
    }
    
    if(is_null($id)) {
        send_JSON_error($statement->error);
    }
    else {
        send_JSON_response($search_results); 
    }

}

// TODO: Limit amount of rows returned by search query (use pagination)


$statement->close();
$connection->close();
?>
