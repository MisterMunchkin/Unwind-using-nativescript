<?php
    include("../dbconnect.php");

    if($_POST){
        $conn = OpenCon();
        session_start();

        $resDate = mysqli_real_escape_string($conn, $_POST["resDate"]);
        $checkinDate = mysqli_real_escape_string($conn, $_POST["checkinDate"]);
        $checkoutDate = mysqli_real_escape_string($conn, $_POST["checkoutDate"]);
        $resDate = mysqli_real_escape_string($conn, $_POST["resStatus"]);
        $guestID = $_SESSION["userID"];
    }else{
        echo "post failed";
    }
?>