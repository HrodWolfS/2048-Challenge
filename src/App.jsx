import { useEffect, useRef, useState } from "react";
import Background from "./components/Background";
import Record from "./components/Record";
import Score from "./components/Score";
import StartAgain from "./components/StartAgain";
import TutorialModal from "./components/TutorialModal";
import GameGrid from "./features/game/GameGrid";
import WinModal from "./features/game/WinModal";
import Header from "./features/header/Header";

function App() {
  const [score, setScore] = useState(0);
  const [ModalWinOpen, setModalWinOpen] = useState(false);
  const [ContinueGame, setContinueGame] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gridRef = useRef(null);

  const createEmptyGrid = () => {
    return Array(4)
      .fill()
      .map(() =>
        Array(4)
          .fill()
          .map(() => ({
            value: 0,
            id: null,
            isNew: false,
            isMerging: false,
          }))
      );
  };

  const [grid, setGrid] = useState(createEmptyGrid);

  const generateId = () =>
    `tile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addRandomNumber = (newGrid) => {
    const emptyCells = [];
    newGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.value === 0) {
          emptyCells.push({ rowIndex, colIndex });
        }
      });
    });

    if (emptyCells.length > 0) {
      const { rowIndex, colIndex } =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      newGrid[rowIndex][colIndex] = {
        value: Math.random() > 0.5 ? 2 : 4,
        id: generateId(),
        isNew: true,
        isMerging: false,
      };
    }
  };

  const initializeGame = () => {
    const newGrid = createEmptyGrid();
    addRandomNumber(newGrid);
    addRandomNumber(newGrid);
    setGrid(newGrid);
  };

  const transposeGrid = (grid) => {
    return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
  };

  const moveLeft = (currentGrid) => {
    const newGrid = currentGrid.map((row) => {
      // Filtrer les cellules non vides
      const filteredRow = row.filter((cell) => cell.value !== 0);

      // Réinitialiser les états d'animation
      filteredRow.forEach((cell) => {
        if (cell.id) {
          cell.isNew = false;
          cell.isMerging = false;
        }
      });

      // Fusion des tuiles
      for (let i = 0; i < filteredRow.length - 1; i++) {
        if (
          filteredRow[i].value === filteredRow[i + 1].value &&
          filteredRow[i].value !== 0
        ) {
          const newValue = filteredRow[i].value * 2;
          filteredRow[i] = {
            value: newValue,
            id: generateId(),
            isNew: false,
            isMerging: true,
          };
          filteredRow[i + 1] = {
            value: 0,
            id: null,
            isNew: false,
            isMerging: false,
          };
          setScore((prev) => prev + newValue);
        }
      }

      // Filtrer à nouveau après la fusion
      const mergedRow = filteredRow.filter((cell) => cell.value !== 0);

      // Remplir avec des cellules vides
      const emptyCount = 4 - mergedRow.length;
      const emptyCells = Array(emptyCount)
        .fill()
        .map(() => ({
          value: 0,
          id: null,
          isNew: false,
          isMerging: false,
        }));

      return [...mergedRow, ...emptyCells];
    });

    return newGrid;
  };

  const moveRight = (currentGrid) => {
    const newGrid = currentGrid.map((row) => {
      const filteredRow = row.filter((cell) => cell.value !== 0);

      filteredRow.forEach((cell) => {
        if (cell.id) {
          cell.isNew = false;
          cell.isMerging = false;
        }
      });

      for (let i = filteredRow.length - 1; i > 0; i--) {
        if (
          filteredRow[i].value === filteredRow[i - 1].value &&
          filteredRow[i].value !== 0
        ) {
          const newValue = filteredRow[i].value * 2;
          filteredRow[i] = {
            value: newValue,
            id: generateId(),
            isNew: false,
            isMerging: true,
          };
          filteredRow[i - 1] = {
            value: 0,
            id: null,
            isNew: false,
            isMerging: false,
          };
          setScore((prev) => prev + newValue);
        }
      }

      const mergedRow = filteredRow.filter((cell) => cell.value !== 0);
      const emptyCount = 4 - mergedRow.length;
      const emptyCells = Array(emptyCount)
        .fill()
        .map(() => ({
          value: 0,
          id: null,
          isNew: false,
          isMerging: false,
        }));

      return [...emptyCells, ...mergedRow];
    });

    return newGrid;
  };

  const moveUp = (currentGrid) => {
    let newGrid = transposeGrid(currentGrid);
    newGrid = moveLeft(newGrid);
    return transposeGrid(newGrid);
  };

  const moveDown = (currentGrid) => {
    let newGrid = transposeGrid(currentGrid);
    newGrid = moveRight(newGrid);
    return transposeGrid(newGrid);
  };

  const handleKeyPress = (e) => {
    let newGrid;
    let moved = false;

    switch (e.key) {
      case "ArrowLeft":
        newGrid = moveLeft([...grid.map((row) => [...row])]);
        break;
      case "ArrowRight":
        newGrid = moveRight([...grid.map((row) => [...row])]);
        break;
      case "ArrowUp":
        newGrid = moveUp([...grid.map((row) => [...row])]);
        break;
      case "ArrowDown":
        newGrid = moveDown([...grid.map((row) => [...row])]);
        break;
      default:
        return;
    }

    // Vérifier si la grille a changé
    moved =
      JSON.stringify(grid.map((row) => row.map((cell) => cell.value))) !==
      JSON.stringify(newGrid.map((row) => row.map((cell) => cell.value)));

    if (moved) {
      addRandomNumber(newGrid);
      setGrid(newGrid);

      if (youWin(newGrid)) {
        setModalWinOpen(true);
        setContinueGame(true);
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    initializeGame();
    setContinueGame(false);
    setModalWinOpen(false);
  };

  const youWin = (currentGrid) => {
    if (!ContinueGame) {
      return currentGrid.some((row) => row.some((cell) => cell.value === 2048));
    }
    return false;
  };

  // ... reste du code (handleScreenshot, handleCloseModals, etc.)

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [grid]);

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <>
      <div className="relative flex h-screen items-center justify-center bg-transparent z-0 overflow-hidden">
        <Background />
        {isModalOpen && (
          <TutorialModal closeModal={() => setIsModalOpen(false)} />
        )}
        {ModalWinOpen && (
          <WinModal resetGame={resetGame} setModalWinOpen={setModalWinOpen} />
        )}
        <div className="relative flex flex-col items-center">
          <Score score={score} />
          <Record newScore={score} />
          <StartAgain resetGame={resetGame} />
          <GameGrid grid={grid} gridRef={gridRef} />
        </div>
      </div>
    </>
  );
}

export default App;
