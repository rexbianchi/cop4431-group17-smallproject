<?php

require_once 'base_controller.php'

# Interact with REST API calls
class UserMethods extends BaseController {

    public function addContact() {}
    public function editContact() {}
    public function searchContact() {}
    public function listContact() {}
    publuc function verifyLogin() {}
}




/**
 * <?php
    $configs = include("../config.php");
    $inData = getRequestInfo();

    $firstName = "";
    $lastName = "";
    $email = "";
    $phone = "";
    # $date = ""; use timestamp
    # $cookie ?

    # If form is submitted...
    if isset($_POST['submit']) {

        # Check if all data has been entered
        if(empty($_POST['firstName'])) {
            $errFirstName = 'Please enter a first name.';
            echo $errFirstName
        }
        if(empty($_POST['lastName'])) {
            $errLastName = 'Please enter a last name.';
        }
        # etc

        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
    }

    

    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
    }
    function sendResultInfoAsJson($object) {
        header('Content-type: application/json');
        echo $object;
    }
    function returnWithError($error) {
        $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $error . '"}';
        sendResultINfoAsJson($retValue);
    }
    function returnWithInfo($firstName, $lastName, $id) {
        $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
        sendResultInfoAsJson($retValue);
    }

?>
 */