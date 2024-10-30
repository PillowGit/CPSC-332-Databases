function Table({ table }) {

  // The top row of the table consists of all the keys in any entry in a table
  const top_row = Object.keys(table[Object.keys(table)[0]]);


  return (
    <div className="w-fit self-center">
      <div className="text-center text-lg">Last Query Result:</div>
      <div className="border-4 border-stone-300 rounded-lg min-w-8 min-h-8">
        {/* The top row of the table (the keys) */}
          <div className="flex flex-row justify-between items-center border-b-4 border-stone-300">
            {top_row.map((key) => (
              <div
                className="border-l-2 border-stone-300 px-4"
              >
                {key}
              </div>
            ))}
          </div>
        {/* The rest of the table (the values) */}
        {table.map((row) => (
          <div className="flex flex-row border-t-2  justify-between items-center">
            {Object.values(row).map((value) => (
              <div
                className="border-l-2 border-stone-300 px-4"
              >
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;