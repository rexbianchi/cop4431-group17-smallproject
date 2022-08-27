<?php
require_once "database.php";
 
# Methods to interact with MySQL Database
class UserModel extends Database
{

    # 
    public function getContacts($maxAmount)
    {
        return $this->select("SELECT * FROM users ORDER BY user_id ASC LIMIT ?", ["i", $maxAmount]);
    }

    # add contact
    # search contact
    # delete contact
    # edit contact
}