import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const GameGrid = ({ grid, gridRef }) => {
  const [cellSize, setCellSize] = useState(window.innerWidth > 640 ? 80 : 48);
  const [gap, setGap] = useState(window.innerWidth > 640 ? 8 : 4);

  useEffect(() => {
    const handleResize = () => {
      setCellSize(window.innerWidth > 640 ? 80 : 48);
      setGap(window.innerWidth > 640 ? 8 : 4);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const getCoord = (row, col) => {
    return {
      x: col * (cellSize + gap),
      y: row * (cellSize + gap),
    };
  };

  return (
    <div
      ref={gridRef}
      className="relative"
      style={{
        width: `calc(4 * ${cellSize}px + 3 * ${gap}px)`,
        height: `calc(4 * ${cellSize}px + 3 * ${gap}px)`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const coord = getCoord(rowIndex, colIndex);

          return (
            <motion.div
              key={cell.id || `${rowIndex}-${colIndex}`}
              className={`absolute flex items-center justify-center rounded-lg text-xl font-bold 
                ${colorClasses[cell.value]}
                ${shadowClasses[cell.value]}
                ${translateClasses[cell.value]}`}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                left: `${coord.x}px`,
                top: `${coord.y}px`,
              }}
              initial={cell.isNew ? { scale: 0 } : false}
              animate={{
                scale: cell.isMerging ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 0.05,
                ease: "easeOut",
                scale: { duration: 0.05 },
              }}
            >
              {cell.value !== 0 ? cell.value.toString() : ""}
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default GameGrid;
