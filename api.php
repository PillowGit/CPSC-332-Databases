<?php
$servername = "localhost";
$username = "react_user";
$password = "peeelow"; 
$dbname = "my_react_app_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Arguments
$table = $_GET["table"];

// SQL query
$sql = "SELECT * FROM " . $table;

$result = $conn->query($sql);

// Prepare an array to store the data
$data = array();

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}

header('Content-Type: application/json');
echo json_encode($data);
$conn->close();
?>