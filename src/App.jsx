import domtoimage from "dom-to-image-more";
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

  const handleModalClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => setIsModalOpen(false);

  const createEmptyGrid = () => {
    return Array(4)
      .fill()
      .map(() => Array(4).fill({ value: 0, id: null }));
  };

  const [grid, setGrid] = useState(createEmptyGrid);

  const addRandomNumber = (newGrid) => {
    let emptyCells = [];
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
        id: Date.now() + Math.random(), // Identifiant unique
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
        setModalWinOpen(true);
        setContinueGame(true);
      }
    }
  };

  const moveLeft = (currentGrid) => {
    const newGrid = currentGrid.map((row) => {
      const filteredRow = row.filter((cell) => cell.value !== 0);
      const emptyCells = Array(4 - filteredRow.length).fill({
        value: 0,
        id: null,
      });
      let newRow = [...filteredRow, ...emptyCells];

      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i].value === newRow[i + 1].value && newRow[i].value !== 0) {
          const newCellValue = newRow[i].value * 2;
          newRow[i] = {
            value: newCellValue,
            id: Date.now() + Math.random(),
            isMerging: true,
          };
          newRow[i + 1] = { value: 0, id: null };
          setScore((prevScore) => prevScore + newCellValue);
        }
      }
      return [...newRow];
    });
    return newGrid;
  };

  const moveRight = (currentGrid) => {
    const newGrid = currentGrid.map((row) => {
      const filteredRow = row.filter((cell) => cell.value !== 0);
      const emptyCells = Array(4 - filteredRow.length).fill({
        value: 0,
        id: null,
      });
      let newRow = [...emptyCells, ...filteredRow];

      for (let i = newRow.length - 1; i > 0; i--) {
        if (newRow[i].value === newRow[i - 1].value && newRow[i].value !== 0) {
          const newCellValue = newRow[i].value * 2;
          newRow[i] = {
            value: newCellValue,
            id: Date.now() + Math.random(),
            isMerging: true,
          };
          newRow[i - 1] = { value: 0, id: null };
          setScore((prevScore) => prevScore + newCellValue);
        }
      }
      return [...newRow];
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

  const moveGrid = (grid, direction) => {
    switch (direction) {
      case "left":
        return moveLeft(grid);
      case "right":
        return moveRight(grid);
      case "up":
        return moveUp(grid);
      case "down":
        return moveDown(grid);
      default:
        return grid;
    }
  };

  const resetGame = () => {
    setScore(0);
    initializeGame();
    setContinueGame(false);
    setModalWinOpen(false);
  };

  const youWin = (currentGrid) => {
    for (let row of currentGrid) {
      if (!ContinueGame) {
        if (row.some((cell) => cell.value === 2048)) {
          // * Pour modifier la valeur si tu veux gagner plus facilement
          return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid]);

  useEffect(() => {
    initializeGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScreenshot = () => {
    if (gridRef.current) {
      domtoimage
        .toPng(gridRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "grid-screenshot.png";
          link.click();
        })
        .catch((error) => {
          console.error("Erreur lors de la capture d'écran:", error);
        });
    }
  };

  const handleCloseModals = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
    if (ModalWinOpen) {
      setModalWinOpen(false);
    }
  };

  return (
    <>
      <div
        onClick={handleCloseModals}
        className="relative flex h-screen items-center justify-center bg-transparent z-0 overflow-hidden"
      >
        <Background />
        <Header handleModalClick={handleModalClick} closeModal={closeModal} />
        {/* MODAL */}
        {isModalOpen && (
          <TutorialModal closeModal={() => setIsModalOpen(false)} />
        )}

        {ModalWinOpen && (
          <WinModal
            resetGame={resetGame}
            setModalWinOpen={setModalWinOpen}
            handleScreenshot={handleScreenshot}
          />
        )}
        {/* Contenu du jeu */}
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
