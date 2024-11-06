const GameGrid = ({ grid, gridRef }) => {
  const colorClasses = {
    0: "bg-slate-500",
    2: "bg-blue-400 text-gray-800",
    4: "bg-sky-400 text-gray-800",
    8: "bg-cyan-400 text-white",
    16: "bg-teal-400 text-white",
    32: "bg-emerald-400 text-white",
    64: "bg-green-400 text-white",
    128: "bg-lime-400 text-white",
    256: "bg-yellow-400 text-white",
    512: "bg-amber-400 text-white",
    1024: "bg-orange-400 text-white",
    2048: "bg-red-400 text-white",
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
      className="grid grid-cols-4 gap-2 bg-gray-700  p-2 rounded-lg shadow-lg sm:gap-4 sm:p-4"
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`h-16 w-16 sm:h-24 sm:w-24 flex items-center justify-center rounded-lg text-xl font-bold border-t border-orange-200
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
