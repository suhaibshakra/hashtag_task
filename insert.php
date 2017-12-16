<?php
   include 'config.php';
   
$hashtag = $_POST['hashtag'];
$date = date("Y/m/d");
$sql = "INSERT INTO hashtags (tag, created_at, updated_at)
VALUES ('$hashtag', '$date', '$date')";

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);

?>