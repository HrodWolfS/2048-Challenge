const GameGrid = ({ grid, gridRef }) => {
  const colorClasses = {
    0: "bg-gray-500",
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
    // On peut ajouter d'autres valeurs ici si besoin
  };

  const shadowClasses = {
    2: "shadow",
    4: "shadow-lg",
    8: "shadow-xl",
    16: "shadow-2xl",
    32: "shadow-3xl",
    64: "shadow-4xl",
    128: "shadow-5xl",
    256: "shadow-6xl",
    512: "shadow-7xl",
    1024: "shadow-8xl",
    2048: "shadow-9xl",
  };

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-4 gap-4 bg-gray-700 p-4 rounded-lg shadow-lg"
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`h-28 w-28 flex items-center justify-center rounded-sm text-xl font-bold 
              ${colorClasses[cell] || "bg-gray-500"}
              ${shadowClasses[cell] || "shadow-none"}
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
