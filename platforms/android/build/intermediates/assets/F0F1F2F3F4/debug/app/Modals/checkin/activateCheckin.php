<?php
    include("../dbconnect.php");

    $conn = OpenCon();
    session_start();

    $userID = $_SESSION["userID"];
    $resID = $_POST["resID"];

    $sql = "UPDATE `reservation_request` SET `reservation_request_status`= 'Checked In' WHERE `reservation_request_id` = '$resID' ";

    $result = mysqli_query($conn, $sql);

    if($result){
        echo "checkin activated";
    }else{
        echo "activation error";
    }

?>