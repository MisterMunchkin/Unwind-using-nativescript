<?php
    function OpenCon(){
        $conn = new mysqli("localhost","id2353939_munchkinv2","fluffy1221","id2353939_unwindv2") or die("Connection failed");
        
        return $conn;
    }
    function CloseCon($conn){
        $conn -> close();
    }
?>