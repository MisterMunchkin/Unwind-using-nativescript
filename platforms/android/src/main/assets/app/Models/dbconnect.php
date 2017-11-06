<?php
    function OpenCon(){
        $conn = new mysqli("localhost","id3474758_munchkinv2","fluffy1221","id3474758_unwindv2") or die("Connection failed");
        
        return $conn;
    }
    function CloseCon($conn){
        $conn -> close();
    }
?>