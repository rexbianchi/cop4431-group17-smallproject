<?php
// Will contain utility functions
include_once(../util.php)

// Will contain config variables
$configs = include(../config.php)

$inData = getRequestInfo();

$database = new Database($configs['db_host'],
                   $configs['db_username'],
                   $configs['db_password'],
                   $configs['db_name']);

$


		





















?>