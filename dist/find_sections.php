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

// SQL query
$sql = "SELECT S.SectionNo, S.Classroom, S.MeetingDays, S.BeginTime, S.EndTime, COUNT(E.StudentID) AS NumberOfStudents FROM Section S LEFT JOIN Enrollment E ON S.SectionNo = E.SectionNo AND S.CourseNo = E.CourseNo WHERE S.CourseNo IN (" . $course_no . ") GROUP BY S.SectionNo, S.Classroom, S.MeetingDays, S.BeginTime, S.EndTime;";

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