<?php
    include("../dbconnect.php");

    $conn = OpenCon();
    session_start();

    $userID = $_SESSION["userID"];

    $sql = "SELECT  `reservation_request_date`, `checkin_date`, `checkout_date`, `reservation_request_status` 
    FROM `reservation_request` WHERE `user_id` = '$userID' ";

    $result = mysqli_query($conn, $sql);

    if($result){
        if(mysqli_num_rows($result) > 0){    
            $bookingData = array();
            $x = 0;
            while($row = mysqli_fetch_array($result)){
                $bookingData[$x] = array(
                    "reservationDate" => $row["reservation_request_date"],
                    "checkinDate" => $row["checkin_date"],
                    "checkoutDate" => $row["checkout_date"],
                    "reservationStatus" => $row["reservation_request_status"]
                );
                $x++;
            }

            $json = json_encode($bookingData);
            echo $json;
        }else{
            echo "no data";
        }
    }else{
        echo "query error";
    }

?>