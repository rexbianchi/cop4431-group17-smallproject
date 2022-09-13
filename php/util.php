<?php 

    function get_request_info()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function send_JSON_response($obj)
    {
		header('Content-type: application/json');

        $payload = array('response' => $obj, 'status' => "success");

		echo json_encode($payload);
	}

    function send_JSON_error($err)
    {
        header('Content-type: application/json');
        
        $payload = array('message' => $err, 'status' => "failure");

        echo json_encode($payload);
    }
?>