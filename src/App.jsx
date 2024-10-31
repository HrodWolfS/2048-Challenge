import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import Record from "./components/Record";
import Score from "./components/Score";
import StartAgain from "./components/StartAgain";
import TutorialModal from "./components/TutorialModal";

function App() {
  const [score, setScore] = useState(0);
  const [ModalWinOpen, setModalWinOpen] = useState(false);
  const [ContinueGame, setContinueGame] = useState(false);

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
    setContinueGame(false);
    setModalWinOpen(false);
  };

  const isGameOver = () => {
    // Vérifie s'il y a des cases vides
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === 0) {
          return false; // Il reste des cases vides
        }
      }
    }
    // Vérifie les mouvements horizontaux et verticaux
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cell = grid[i][j];
        // Vérifie à droite
        if (j < grid[i].length - 1 && cell === grid[i][j + 1]) {
          return false;
        }
        // Vérifie en bas
        if (i < grid.length - 1 && cell === grid[i + 1][j]) {
          return false;
        }
      }
    }
    // Si aucune case vide et aucun mouvement possible, alors game over
    return true;
  };

  const youWin = (currentGrid) => {
    for (let row of currentGrid) {
      if (!ContinueGame) {
        if (row.includes(8)) {
          return true;
        }
      }
    }
    return false;
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
    let newGrid;
    switch (e.key) {
      case "ArrowLeft":
        newGrid = moveLeft(grid);
        break;
      case "ArrowRight":
        newGrid = moveRight(grid);
        break;
      case "ArrowUp":
        newGrid = moveUp(grid);
        break;
      case "ArrowDown":
        newGrid = moveDown(grid);
        break;
      default:
        return;
    }

    if (JSON.stringify(grid) !== JSON.stringify(newGrid)) {
      addRandomNumber(newGrid);
      setGrid(newGrid);

      if (youWin(newGrid)) {
        // Optionally, stop further game progress or allow continuing
        setModalWinOpen(true);
        setContinueGame(true);
      }
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [grid]);

  useEffect(() => {
    initializeGame();
  }, []);

  const gridRef = useRef(null);

  const handleScreenshot = async () => {
    if (gridRef.current) {
      console.log("click");
      const canvas = await html2canvas(gridRef.current);
      const image = canvas.toDataURL("image/png");
      // Créer un lien de téléchargement
      const link = document.createElement("a");
      link.href = image;
      link.download = "grid-screenshot.png";
      link.click();
    }
  };

  return (
    <>
      <Header openModal={openModal} closeModal={closeModal} />
      <div
        onClick={closeModal}
        className="relative flex items-center justify-center bg-gray-500 overflow-hidden"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        <TutorialModal isOpen={isModalOpen} onClose={closeModal} />
        <Background />
        {/* GAME OVER */}
        {isGameOver() && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-bebas">
            <div className="bg-white p-8 rounded-md shadow-lg text-center">
              <h2 className="text-2xl font-rubik mb-4">Game Over</h2>
              <p className="text-xl">je suis sûr que tu peux faire mieux</p>
              <button
                onClick={resetGame}
                className="px-4 py-2 mt-4 bg-orange-500 text-white rounded-md font-bold animate-[scalePulse_2s_ease-in-out_infinite]"
              >
                Recommencer
              </button>
              <button
                onClick={handleScreenshot}
                className="px-4 py-2 ml-3 mt-3 bg-blue-500 text-white rounded pointer"
              >
                Capturer ce moment
              </button>
            </div>
          </div>
        )}
        {/* YOU WIN */}
        {ModalWinOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-bebas">
            <div className="bg-white p-8 rounded-md shadow-lg text-center">
              <h2 className="text-2xl mb-4">
                Serieux ?! je pensais pas que tu y arriverais...
              </h2>
              <p>Tu prevois quoi pour la suite ?</p>
              <button
                onClick={resetGame}
                className="px-4 py-2 text-orange-400 bg-gray-700 rounded-md font-bold pointer"
              >
                Recommencer
              </button>
              <button
                onClick={() => setModalWinOpen(false)}
                className="px-4 py-2 ml-3 bg-orange-400 text-gray-700 rounded-md font-bold pointer"
              >
                Continuer
              </button>
              <button
                onClick={handleScreenshot}
                className="px-4 py-2 ml-3 mt-3 bg-blue-500 text-white rounded pointer"
              >
                Capturer ce moment
              </button>
            </div>
          </div>
        )}
        {/* Contenu du jeu */}
        <div className="relative z-10 flex flex-col items-center space-y-4">
          <Score score={score} />
          <Record newScore={score} />
          <StartAgain resetGame={resetGame} />
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
        </div>
      </div>
    </>
  );
}

export default App;
