<?php
define("PROJECT_ROOT_PATH", __DIR__ );
 
// include main configuration file
require_once PROJECT_ROOT_PATH . "/config.php";
 
// include the base controller file
require_once PROJECT_ROOT_PATH . "/api/base_controller.php";
 
// include the use model file
require_once PROJECT_ROOT_PATH . "/models/user_model.php";
?>