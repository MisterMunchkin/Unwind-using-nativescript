<?php
    include("../dbconnect.php");

    if($_POST){
        $conn = OpenCon();
        
        $email = mysqli_real_escape_string($conn, $_POST["email"]);
        $password = mysqli_real_escape_string($conn, $_POST["password"]);

        echo $email.$password;
    }else{
        echo "post failed";
    }
?>