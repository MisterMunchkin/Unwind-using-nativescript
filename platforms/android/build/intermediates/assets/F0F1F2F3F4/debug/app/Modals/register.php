<?php
    include("../dbconnect.php");

    if($_POST){
        $conn = OpenCon();
        
        $email = mysqli_real_escape_string($conn, $_POST["email"]);
        $password = mysqli_real_escape_string($conn, $_POST["password"]);
        $firstname = mysqli_real_escape_string($conn, $_POST["fname"]);
        $lastname = mysqli_real_escape_string($conn, $_POST["lname"]);
        $MI = mysqli_real_escape_string($conn, $_POST["MI"]);
        $birthdate = mysqli_real_escape_string($conn, $_POST["birthdate"]);
        $gender = mysqli_real_escape_string($conn, $_POST["gender"]);
        $contact_no = mysqli_real_escape_string($conn, $_POST["contact_no"]);
        
        $date_created = date("Y/m/d H:i:s");
       
		$sql = "SELECT * FROM `user_account` WHERE `email` = '$email'";
        
		$result = mysqli_query($conn, $sql);
        
        if(mysqli_num_rows($result) > 0){
            echo "guest already exist, please sign in";
        }else{
            $hash = password_hash($password, PASSWORD_DEFAULT);
            
            $sql = "INSERT INTO `user_account`(`first_name`, `last_name`, `middle_initial`, `email`, `birthdate`,
             `gender`, `contact_no`, `date_account_created`, `password`) 
            VALUES ('$firstname','$lastname','$MI','$email','$birthdate','$gender',
            '$contact_no','$date_created','$hash')";
            
            if(mysqli_query($conn, $sql)){
                echo "user added";
            }else{
                echo "error: user insert";
            }
        }
       //echo "fuck me";
    }else{
        echo "post failed";
    }
?>