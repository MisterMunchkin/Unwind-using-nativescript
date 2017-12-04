<?php
    include("../dbconnect.php");

    if($_POST){
        $conn = OpenCon();
        session_start();

        $resID = mysqli_real_escape_string($conn, $_POST["resID"]);
        $resDate = mysqli_real_escape_string($conn, $_POST["resDate"]);
        $checkinDate = mysqli_real_escape_string($conn, $_POST["checkinDate"]);
        $checkoutDate = mysqli_real_escape_string($conn, $_POST["checkoutDate"]);
        $resDate = mysqli_real_escape_string($conn, $_POST["resStatus"]);
        $guestID = $_SESSION["userID"];

        $sql = "UPDATE `reservation_request` 
        SET `reservation_request_status`='Cancelled' 
        WHERE `user_id` = '$guestID' AND `reservation_request_id` = '$resID' ";

        if(mysqli_query($conn, $sql)){
            echo "update success";
        }else{
            echo "update failure";
        }
    }else{
        echo "post failed";
    }
?>