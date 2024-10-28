import { useEffect, useState } from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import Score from "./components/Score";
import StartAgain from "./components/StartAgain";

function App() {
  const [score, setScore] = useState(0);

  const colorClasses = {
    0: "bg-gray-200",
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

  const createEmptyGrid = () => {
    return Array(4)
      .fill()
      .map(() => Array(4).fill(0));
  };

  const [grid, setGrid] = useState(createEmptyGrid);

  const addRandomNumber = (newGrid) => {
    let emptyCells = [];
    newGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) {
          emptyCells.push({ rowIndex, colIndex });
        }
      });
    });

    if (emptyCells.length > 0) {
      const { rowIndex, colIndex } =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      newGrid[rowIndex][colIndex] = Math.random() > 0.5 ? 2 : 4;
    }
  };

  const initializeGame = () => {
    const newGrid = createEmptyGrid();
    addRandomNumber(newGrid);
    addRandomNumber(newGrid);
    setGrid(newGrid);
  };

  const resetGame = () => {
    setScore(0);
    initializeGame();
  };

  // * MOVELEFT
  const moveLeft = (currentGrid) => {
    const newGrid = currentGrid.map((row) => {
      const filteredRow = row.filter((value) => value !== 0);
      const emptyCells = Array(4 - filteredRow.length).fill(0);
      let newRow = [...filteredRow, ...emptyCells];

      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1] && newRow[i] !== 0) {
          const newCellValue = newRow[i] * 2;
          newRow[i] = newCellValue;
          newRow[i + 1] = 0;
          setScore((prevScore) => prevScore + newCellValue);
        }
      }
      newRow = newRow.filter((value) => value !== 0);
      return [...newRow, ...Array(4 - newRow.length).fill(0)];
    });
    return newGrid;
  };

  // * MOVERIGHT
  const moveRight = (currentGrid) => {
    const newGrid = currentGrid.map((row) => {
      const filteredRow = row.filter((value) => value !== 0);
      const emptyCells = Array(4 - filteredRow.length).fill(0);
      let newRow = [...emptyCells, ...filteredRow];

      for (let i = newRow.length - 1; i > 0; i--) {
        if (newRow[i] === newRow[i - 1] && newRow[i] !== 0) {
          const newCellValue = newRow[i] * 2;
          newRow[i] = newCellValue;
          newRow[i - 1] = 0;
          setScore((prevScore) => prevScore + newCellValue);
        }
      }
      newRow = newRow.filter((value) => value !== 0);
      return [...Array(4 - newRow.length).fill(0), ...newRow];
    });
    return newGrid;
  };

  const transposeGrid = (grid) => {
    return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
  };

  // * MOVEUP
  const moveUp = (currentGrid) => {
    let newGrid = transposeGrid(currentGrid);
    newGrid = newGrid.map((row) => {
      const filteredRow = row.filter((value) => value !== 0);
      const emptyCells = Array(4 - filteredRow.length).fill(0);
      let newRow = [...filteredRow, ...emptyCells];

      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1] && newRow[i] !== 0) {
          const newCellValue = newRow[i] * 2;
          newRow[i] = newCellValue;
          newRow[i + 1] = 0;
          setScore((prevScore) => prevScore + newCellValue);
        }
      }

      newRow = newRow.filter((value) => value !== 0);
      return [...newRow, ...Array(4 - newRow.length).fill(0)];
    });

    return transposeGrid(newGrid);
  };

  // * MOVEDOWN
  const moveDown = (currentGrid) => {
    let newGrid = transposeGrid(currentGrid);
    newGrid = newGrid.map((row) => {
      const filteredRow = row.filter((value) => value !== 0);
      const emptyCells = Array(4 - filteredRow.length).fill(0);
      let newRow = [...emptyCells, ...filteredRow];

      for (let i = newRow.length - 1; i > 0; i--) {
        if (newRow[i] === newRow[i - 1] && newRow[i] !== 0) {
          const newCellValue = newRow[i] * 2;
          newRow[i] = newCellValue;
          newRow[i - 1] = 0;
          setScore((prevScore) => prevScore + newCellValue);
        }
      }
      newRow = newRow.filter((value) => value !== 0);
      return [...Array(4 - newRow.length).fill(0), ...newRow];
    });

    return transposeGrid(newGrid);
  };

  const handleKeyPress = (e) => {
    if (e.key === "ArrowLeft") {
      console.log("ArrowLeft");
      const newGrid = moveLeft(grid);
      addRandomNumber(newGrid);
      setGrid(newGrid);
    }
    if (e.key === "ArrowRight") {
      console.log("ArrowRight");
      const newGrid = moveRight(grid);
      addRandomNumber(newGrid);
      setGrid(newGrid);
    }
    if (e.key === "ArrowUp") {
      console.log("ArrowUp");
      const newGrid = moveUp(grid);
      addRandomNumber(newGrid);
      setGrid(newGrid);
    }
    if (e.key === "ArrowDown") {
      console.log("ArrowDown");
      const newGrid = moveDown(grid);
      addRandomNumber(newGrid);
      setGrid(newGrid);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [grid]);

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <>
      <Header />
      <div
        className="relative flex items-center justify-center bg-gray-200 overflow-hidden"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        <Background />
        {/* Contenu du jeu */}
        <div className="relative z-10 flex flex-col items-center space-y-4">
          <Score score={score} />
          <StartAgain resetGame={resetGame} />
          <div className="grid grid-cols-4 gap-4 bg-gray-300 p-4 rounded-lg">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`h-20 w-20 flex items-center justify-center rounded-md text-xl font-bold ${
                    colorClasses[cell] || "bg-gray-200"
                  }`}
                >
                  {cell !== 0 ? cell : ""}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
