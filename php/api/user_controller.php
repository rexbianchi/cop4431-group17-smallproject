<?php

require_once 'base_controller.php'

# Interact with REST API calls
class UserController extends BaseController {

    public function addContact() {}
    public function editContact() {}
    public function deleteContact() {}
    public function searchContact() {}

    /**
     * "/user/listContacts" Endpoint - Get list of contacts (10)
    */
    public function listContacts() {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
 
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $userModel = new UserModel();
                $intLimit = 10;
                $arrUsers = $userModel->listContacts($intLimit);
                $responseData = json_encode($arrUsers);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
 
        // Send output
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

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