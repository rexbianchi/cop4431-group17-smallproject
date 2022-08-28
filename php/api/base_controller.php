<?php

class BaseController {
    
    # Called when user tries to can an unimplemented method
    # Throws 404 Not Found error
    public function __call($name, $arguments)
    {
        $this->sendOutput('', array('HTTP/1.1 404 Not Found'));
    }
 
    # Gets URI elements and returns them as an array
    # Useful for validating REST endpoint sent by the suer
    protected function getUriSegments()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode( '/', $uri );
 
        return $uri;
    }
 
    # Get the parameters from the query string
    # Returns parameters an array
    protected function getQueryStringParams()
    {
        return parse_str($_SERVER['QUERY_STRING'], $query);
    }
 
    # Sends the API response to the user
    protected function sendOutput($data, $httpHeaders=array())
    {
        header_remove('Set-Cookie');
 
        if (is_array($httpHeaders) && count($httpHeaders)) {
            foreach ($httpHeaders as $httpHeader) {
                header($httpHeader);
            }
        }
 
        echo $data;
        exit;
    }
}    

?>