<?php
    include("../dbconnect.php");

    $conn = OpenCon();

    session_start();

    session_destroy();

    if(!isset($_SESSION)){
        echo "logged out";
    }else{
        echo "still logged in";
    }
?>