<?php

// Database connection details
$servername = "localhost";
$username = "react_user";
$password = "peeelow"; 
$dbname = "my_react_app_db";

// Create a new MySQLi object and connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get the table name to fetch from the URL parameters
// Use $_GET["table"] for get requests 
// Use $_SERVER["argv"][1] for php commands
//$table = $_SERVER["argv"][1];
$table = $_GET["table"];

// Construct the SQL query to select all rows from the specified table
$sql = "SELECT * FROM " . $table;

// Execute the query
$result = $conn->query($sql);

// Prepare an array to store the data
$data = array();

// Fetch each row from the result set and add it to the data array
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}

// Set the Content-Type header to JSON
header('Content-Type: application/json');

// Encode the data array as a JSON object and output it
echo json_encode($data);

// Close the database connection
$conn->close();
?>