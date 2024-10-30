import React, { useState } from "react";

function ProfessorInfo({ setTable }) {
  // Auto updating form items
  const [studentId, setStudentId] = useState("1");
  const handleIdChange = (event) => {
    setStudentId(event.target.value);
  };

  // Fetch data
  async function makeRequest() {
    const php_file_name = "find_student.php";
    const params = {
      student_id: studentId,
    };
    const formatted_params =
      !params || Object.keys(params).length === 0
        ? ""
        : "?" +
          Object.entries(params)
            .map(
              ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join("&");
    const request_url = window.location.href + php_file_name + formatted_params;
    fetch(request_url)
      .then((response) => response.text())
      .then((data) => setTable(JSON.parse(data)));
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" border-x-slate-700 border-b-2 min-w-96 text-2xl font-bold mt-8 mb-4">
        Get Student's Courses & Grades with Student's ID
      </div>
      <div className="flex flex-row justify-center items-center min-h-20 mb-8 min-w-4">
        <div className="flex flex-col justify-around items-center min-h-20 mx-8">
          <div className="text-xl font-bold mx-4">Student ID</div>
          <input
            type="text"
            value={studentId}
            onChange={handleIdChange}
            className="text-center text-wrap border-stone-900 border-2 bg-stone-800"
          />
        </div>
        <button
          className=" text-lg font-bold bg-sky-600 hover:bg-sky-700 border-b-4 border-sky-800 hover:border-sky-900 rounded-lg text-white py-2 px-4"
          onClick={makeRequest}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ProfessorInfo;
