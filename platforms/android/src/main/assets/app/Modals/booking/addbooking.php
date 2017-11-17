<?php
    include("../dbconnect.php");

    if($_POST){
        $conn = OpenCon();
        session_start();

        $checkIn = mysqli_real_escape_string($conn, $_POST["checkIn"]);
        $checkOut = mysqli_real_escape_string($conn, $_POST["checkOut"]);
        $requestStatus = "Pending";
        $userID = $_SESSION["userID"];
        $dateRequest = date("Y/m/d H:i:s");

        $sql = "INSERT INTO `reservation_request`(`reservation_request_date`, `checkin_date`, `checkout_date`, `reservation_request_status`, `user_id`) 
        VALUES ("$dateRequest","$checkIn","$checkOut","$requestStatus","$userID")";

        if(mysqli_query($conn, $sql)){
            echo "booking added";
        }else{
            echo "query error";
        }
    }else{
        echo "post failed";
    }
?>