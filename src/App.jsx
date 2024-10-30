import React, { useState } from "react";
import Table from "./Table";
import ProfessorInfo from "./forms/ProfessorInfo";
import CheckGrades from "./forms/CheckGrades";
import CheckSections from "./forms/CheckSections";
import CheckStudent from "./forms/CheckStudent";

function App() {
  const [table, updateTable] = useState([{ null: "null" }]);
  function setTable(table) {
    if (table.length > 0) {
      updateTable(table);
    } else {
      updateTable([{ null: "no data found" }]);
    }
  }

  return (
    <>
      <div className="w-full min-h-full absolute flex flex-col items-center justify-center left-0 top-0">
        <h1 className="font-bold text-5xl mt-8 mb-16 underline text-stone-50">
          332 Term Project
        </h1>
        <Table table={table} />
        <ProfessorInfo setTable={setTable} />
        <CheckGrades setTable={setTable} />
        <CheckSections setTable={setTable} />
        <CheckStudent setTable={setTable} />
      </div>
    </>
  );
}

export default App;
