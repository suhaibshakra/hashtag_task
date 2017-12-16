<?php
    
$servername = "localhost";
$username = "id3937306_suhaib";
$password = "123456789";
$dbname = "id3937306_hashtags";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
?>