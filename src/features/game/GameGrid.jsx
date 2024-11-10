import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const GameGrid = ({ grid, gridRef }) => {
  const [cellSize, setCellSize] = useState(window.innerWidth > 640 ? 60 : 40);
  const [gap, setGap] = useState(window.innerWidth > 640 ? 4 : 2);
  const [prevGrid, setPrevGrid] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setCellSize(window.innerWidth > 640 ? 30 : 20);
      setGap(window.innerWidth > 640 ? 2 : 0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPrevGrid(grid);
  }, [grid]);

  const colorClasses = {
    0: "bg-slate-500/30", // Fond semi-transparent pour les cellules vides
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

  const getCoord = (row, col) => ({
    x: col * (cellSize + gap),
    y: row * (cellSize + gap),
  });

  const findPrevPosition = (cell) => {
    if (!prevGrid || !cell.id) return null;

    for (let row = 0; row < prevGrid.length; row++) {
      for (let col = 0; col < prevGrid[row].length; col++) {
        if (prevGrid[row][col].id === cell.id) {
          return getCoord(row, col);
        }
      }
    }
    return null;
  };

  return (
    <div
      ref={gridRef}
      className="relative bg-slate-700/50 rounded-lg p-2"
      style={{
        width: `calc(4 * ${cellSize}px + 3 * ${gap}px + 16px)`, // +16px pour le padding
        height: `calc(4 * ${cellSize}px + 3 * ${gap}px + 16px)`,
      }}
    >
      {/* Grille de fond statique */}
      <div className="absolute inset-2 grid grid-cols-4 gap-1">
        {Array(16)
          .fill(null)
          .map((_, index) => (
            <div
              key={`bg-${index}`}
              className="bg-slate-500/30 rounded-lg"
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
              }}
            />
          ))}
      </div>

      {/* Tuiles animées */}
      <div className="relative">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            if (cell.value === 0) return null; // Ne pas rendre les cellules vides

            const coord = getCoord(rowIndex, colIndex);
            const prevPos = findPrevPosition(cell);

            return (
              <motion.div
                key={cell.id || `${rowIndex}-${colIndex}`}
                className={`absolute flex items-center justify-center rounded-lg text-xl font-bold 
                  ${colorClasses[cell.value]} shadow-lg
                  ${cell.isMerging ? "z-20" : "z-10"}`}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
                initial={
                  cell.isNew
                    ? {
                        scale: 0,
                        x: coord.x,
                        y: coord.y,
                      }
                    : prevPos
                    ? {
                        x: prevPos.x,
                        y: prevPos.y,
                      }
                    : {
                        x: coord.x,
                        y: coord.y,
                      }
                }
                animate={{
                  scale: cell.isMerging ? [1, 1.1, 1] : 1,
                  x: coord.x,
                  y: coord.y,
                }}
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 20 },
                  y: { type: "spring", stiffness: 200, damping: 20 },
                  scale: { duration: 0.15 },
                }}
              >
                {cell.value}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GameGrid;
