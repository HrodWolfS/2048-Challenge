import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const GameGrid = ({ grid, gridRef }) => {
  const [prevGrid, setPrevGrid] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  // Gestion du responsive
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 640;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  useEffect(() => {
    setPrevGrid(grid);
  }, [grid]);

  const colorClasses = {
    0: "bg-slate-500/30",
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

  const getOffset = (value) => {
    const offsets = {
      2: -1,
      4: -1.5,
      8: -3.5,
      16: -5.5,
      32: -7.5,
      64: -9.5,
      128: -10.5,
      256: -11.5,
      512: -12.5,
      1024: -13.5,
      2048: -14.5,
    };
    return offsets[value] || 0;
  };

  const getCoord = (row, col) => ({
    x: col * (isMobile ? 64 + 8 : 96 + 16),
    y: row * (isMobile ? 64 + 8 : 96 + 16),
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

  const getTileSize = () => (isMobile ? "64px" : "96px");
  const getGridSize = () => ({
    width: isMobile
      ? "calc(4 * 64px + 3 * 8px + 16px)"
      : "calc(4 * 96px + 3 * 16px + 32px)",
    height: isMobile
      ? "calc(4 * 64px + 3 * 8px + 16px)"
      : "calc(4 * 96px + 3 * 16px + 32px)",
  });

  return (
    <div
      ref={gridRef}
      className="relative bg-gray-700 p-2 rounded-lg shadow-shadowBtn  border-b border-orange-400 sm:p-4"
      style={getGridSize()}
    >
      {/* Grille de fond statique */}
      <div className="absolute inset-2 sm:inset-4 grid grid-cols-4 gap-2 sm:gap-4">
        {Array(16)
          .fill(null)
          .map((_, index) => (
            <div
              key={`bg-${index}`}
              className="h-16 w-16 sm:h-24 sm:w-24 bg-slate-500/30 border-t border-orange-200 rounded-lg"
            />
          ))}
      </div>

      {/* Tuiles animées */}
      <div className="relative">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            if (cell.value === 0) return null;

            const coord = getCoord(rowIndex, colIndex);
            const prevPos = findPrevPosition(cell);
            const offset = getOffset(cell.value);
            const tileSize = getTileSize();

            return (
              <motion.div
                key={cell.id || `${rowIndex}-${colIndex}`}
                className={`absolute flex items-center justify-center rounded-lg text-xl font-bold 
                  border-t border-orange-200
                  ${colorClasses[cell.value]}
                  ${shadowClasses[cell.value]}
                  ${cell.isMerging ? "z-20" : "z-10"}`}
                style={{
                  width: tileSize,
                  height: tileSize,
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
                  x: coord.x + offset,
                  y: coord.y + offset,
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
