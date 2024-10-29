import "./App.css";

import { useState } from "react";

function App() {
  // Page url
  const url = window.location.href;
  // Pulled info
  const [display, setDisplay] = useState("no data yet");
  // Pull data test
  async function fetchData() {
    // Pull from "url/api.php" with parameter table="users"
    const req_url = url + "api.php?table=users";
    console.log(`Requesting data from ${req_url}`);
    fetch(req_url)
      .then((response) => response.text())
      .then((data) => setDisplay(data));
  }

  return (
    <>
      {/* Page container - full width, flex col */}
      <div className="w-full h-auto absolute flex-col items-center justify-center left-0 top-0">
        {/*  */}
        <h1 className="font-bold text-3xl mt-8">{display}</h1>
        <button
          onClick={fetchData}
          className="bg-blue-500 border-b-blue-600 border-b-2 text-white font-bold px-4 py-2 rounded-lg mt-10"
        >
          Meeee
        </button>
      </div>
    </>
  );
}

export default App;
