
import React, { useState } from "react";

function ProfessorInfo({ setTable }) {

  // Auto updating form items
  const [courseNo, setCourseNo] = useState("203");
  const handleCourseChange = (event) => {
    setCourseNo(event.target.value);
  };

  // Fetch data
  async function makeRequest() {
    const php_file_name = "find_sections.php";
    const params = {
      course_no: courseNo,
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
    const request_url = "/" + php_file_name + formatted_params;
    fetch(request_url)
      .then((response) => response.text())
      .then((data) => setTable(JSON.parse(data)));
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" border-x-slate-700 border-b-2 min-w-96 text-2xl font-bold mt-8 mb-4">Get All Sections for a Class with the Course #</div>
      <div className="flex flex-row justify-center items-center min-h-20 mb-8 min-w-4">
        <div className="flex flex-col justify-around items-center min-h-20 mx-8">
          <div className="text-xl font-bold mx-4">Course #</div>
          <input type="text" value={courseNo} onChange={handleCourseChange} className="text-center text-wrap border-stone-900 border-2 bg-stone-800"/>
        </div>
        <button className=" text-lg font-bold bg-sky-600 hover:bg-sky-700 border-b-4 border-sky-800 hover:border-sky-900 rounded-lg text-white py-2 px-4" onClick={makeRequest}>Submit</button>
      </div>
    </div>
  );
}

export default ProfessorInfo;