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
$searchTerm = "%".$in_data["search"]."%";

$statement = $connection->prepare("SELECT FirstName, LastName, Email, PhoneNumber FROM Contacts WHERE FirstName like ? AND UserId = ? OR LastName like ? AND UserId = ?");
$statement->bind_param("ssss", $searchTerm , $in_data["id"], $searchTerm, $in_data["id"]);
$statement->execute();
$result = $statement->get_result();

$id = $in_data["id"];

// while($row = $result->fetch_assoc()) {
//     if( $searchCount > 0 ) {
//         $searchResults .= ",";
//     }
//     $searchCount++;
//     $searchResults .= $row["FirstName"] . ' ' . $row["LastName"];
// }
 $searchResults = array();
while($row = $result->fetch_assoc()) {
    array_push($searchResults, $row);
}

if(is_null($id)) {
    send_JSON_error($statement->error);
}
else {
    send_JSON_response($searchResults); 
}


$statement->close();
$connection->close();
?>