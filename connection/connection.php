<?php
// MYSQL connection code

$servername = "localhost";
$username = "root";
$password = "";
$database = "event";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Note: You should include this file in other PHP files where you need a database connection.
// For example: include('connection.php');

?>
