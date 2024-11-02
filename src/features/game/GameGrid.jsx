const GameGrid = ({ grid, gridRef }) => {
  const colorClasses = {
    0: "bg-gray-400",
    2: "bg-yellow-100 text-gray-800",
    4: "bg-yellow-200 text-gray-800",
    8: "bg-orange-300 text-white",
    16: "bg-orange-400 text-white",
    32: "bg-orange-500 text-white",
    64: "bg-orange-600 text-white",
    128: "bg-red-400 text-white",
    256: "bg-red-500 text-white",
    512: "bg-red-600 text-white",
    1024: "bg-purple-500 text-white",
    2048: "bg-purple-600 text-white",
  };

  const shadowClasses = {
    2: "shadow-shadow2",
    4: "shadow-shadow4",
    8: "shadow-shadow8",
    16: "shadow-shadow16",
    32: "shadow-shadow32",
    64: "shadow-shadow64",
    128: "shadow-shadow128",
    256: "shadow-shadow256",
    512: "shadow-shadow512",
    1024: "shadow-shadow1024",
    2048: "shadow-shadow2048",
  };

  const translateClasses = {
    2: "translate-translte2",
    4: "translate-translte4",
    8: "translate-translte8",
    16: "translate-translte16",
    32: "translate-translte32",
    64: "translate-translte64",
    128: "translate-translte128",
    256: "translate-translte256",
    512: "translate-translte512",
    1024: "translate-translte1024",
    2048: "translate-translte2048",
  };

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-4 gap-2 bg-gray-700 border border-orange-400 p-2 rounded-lg shadow-lg sm:gap-4 sm:p-4"
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`h-16 w-16 sm:h-28 sm:w-28 flex items-center justify-center rounded-lg border border-orange-200 text-xl font-bold 
              ${colorClasses[cell]}
              ${shadowClasses[cell]}
              ${translateClasses[cell]}
            `}
          >
            {cell !== 0 ? cell : ""}
          </div>
        ))
      )}
    </div>
  );
};

export default GameGrid;
