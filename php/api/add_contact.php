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
    send_error_response_as_JSON()
}




		





















?>