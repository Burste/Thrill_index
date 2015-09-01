<?php

        $conn = mysqli_connect("mysql.hostinger.com.hk","u361545854_gore","25571174","u361545854_msg");
        if(mysqli_connect_errno($conn)){
            die("false");

        }else{
            echo "success";
        }
?>
