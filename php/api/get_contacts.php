<?php
// Will contain utility functions
include_once("../util.php");

// Show errors
ini_set('display_errors', 1);

// Will contain config variables
$configs = include("../config.php");

$in_data = get_request_info();
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

// page default (10)
// If search is null -> return 10 contacts
// Else -> return search results
// Need user ID
$searchCount = 0;
$searchResults = "";

$statement = $connection->prepare("SELECT FirstName AND LastName FROM Contacts WHERE FirstName like ? OR LastName like ? AND UserId = ?");
$statement->bind_param("sss", $in_data["search"], $in_data["search"], $in_data["id"]);
$statement->execute();
$result = $statement->get_result();

while($row = $result->fetch_assoc()) {
    print_r($row);
    if( $searchCount > 0 ) {
        $searchResults .= ",";
    }
    $searchCount++;
    $searchResults .= '"' . $row["FirstName"] . ' ' . $row["LastName"] . '"';
}  

if( $searchCount == 0 ) {
    send_JSON_error($statement->error);
}
else {
    send_JSON_response(""); 
}


$statement->close();
$connection->close();

?>