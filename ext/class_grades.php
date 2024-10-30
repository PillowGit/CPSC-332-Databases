<?php
$servername = "mariadb";
$username = "cs332g6";
$password = "Vsmsm2B4"; 
$dbname = "cs332g6";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Arguments
$course_no = $_GET["course_no"];
$section_no = $_GET["section_no"];

// SQL query
$sql = "SELECT Grade, COUNT(*) AS GradeCount FROM Enrollment WHERE CourseNo = " . $course_no . " AND SectionNo = " . $section_no . " GROUP BY Grade ORDER BY CASE WHEN Grade = 'A' THEN 1 WHEN Grade = 'B' THEN 2 WHEN Grade = 'C' THEN 3 WHEN Grade = 'D' THEN 4 WHEN Grade = 'E' THEN 5 WHEN Grade = 'F' THEN 6 ELSE 7 END;";

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