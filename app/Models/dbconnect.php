<?php
    function OpenCon(){
        $conn = new mysqli("localhost","root","","unwind") or die("Connection failed");
        
        return $conn;
    }
    function CloseCon($conn){
        $conn -> close();
    }
?>