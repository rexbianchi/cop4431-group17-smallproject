<?php 

    function get_request_info()
	{
		return json_decode(file_get_contents('php://input'), true);
    }
    
    function get_query_params() {
        $url = "http://$_SERVER['HTTP_HOST']$_SERVER['REQUEST_URI']";
        // Use parse_url() function to parse the URL
        // and return an associative array which
        // contains its various components
        $url_components = parse_url($url);
 
        // Use parse_str() function to parse the
        // string passed via URL
        parse_str($url_components['query'], $params);
            
        return $params;
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