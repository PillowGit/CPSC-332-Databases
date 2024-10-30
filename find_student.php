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
$student_id = $_GET["student_id"];

// SQL query
$sql = "SELECT C.CourseTitle, E.Grade FROM Student S JOIN Enrollment E ON S.StudentID = E.StudentID JOIN Course C ON E.CourseNo = C.CourseNo WHERE S.StudentID = " . $student_id . ";";

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