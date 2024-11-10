import domtoimage from "dom-to-image-more";
import { useEffect, useRef, useState } from "react";
import Background from "./components/Background";
import Record from "./components/Record";
import Score from "./components/Score";
import StartAgain from "./components/StartAgain";
import TutorialModal from "./components/TutorialModal";
import GameGrid from "./features/game/GameGrid";
import GameOverModal from "./features/game/GameOverModal";
import WinModal from "./features/game/WinModal";
import Header from "./features/header/Header";

function App() {
  const [score, setScore] = useState(0);
  const [ModalWinOpen, setModalWinOpen] = useState(false);
  const [ContinueGame, setContinueGame] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameOverModal, setGameOverModal] = useState(false);
  const gridRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleModalClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => setIsModalOpen(false);

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
      const filteredRow = row.filter((cell) => cell.value !== 0);

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
      if (isGameOver(newGrid)) {
        setGameOverModal(true);
      }
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    let newGrid;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        newGrid = moveRight(grid);
      } else {
        newGrid = moveLeft(grid);
      }
    } else {
      if (deltaY > 0) {
        newGrid = moveDown(grid);
      } else {
        newGrid = moveUp(grid);
      }
    }

    if (JSON.stringify(grid) !== JSON.stringify(newGrid)) {
      addRandomNumber(newGrid);
      setGrid(newGrid);

      if (youWin(newGrid)) {
        setModalWinOpen(true);
        setContinueGame(true);
      }

      if (isGameOver(newGrid)) {
        setGameOverModal(true);
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    initializeGame();
    setContinueGame(false);
    setModalWinOpen(false);
  };

  const isGameOver = (grid) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].value === 0) {
          return false;
        }
      }
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length - 1; j++) {
        if (grid[i][j].value === grid[i][j + 1].value) {
          return false;
        }
      }
    }

    for (let i = 0; i < grid.length - 1; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].value === grid[i + 1][j].value) {
          return false;
        }
      }
    }

    return true;
  };

  const youWin = (currentGrid) => {
    for (let row of currentGrid) {
      if (!ContinueGame) {
        if (row.some((cell) => cell.value === 2048)) {
          // * Pour modifier la valeur si tu veux gagner plus vite
          return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
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
    if (gameOverModal) {
      setGameOverModal(false);
    }
  };

  return (
    <>
      <div
        onClick={handleCloseModals}
        className="relative flex h-screen items-center justify-center bg-transparent  z-0 overflow-hidden"
      >
        <Background />
        <Header handleModalClick={handleModalClick} closeModal={closeModal} />
        {/* MODAL */}
        {isModalOpen && (
          <TutorialModal closeModal={() => setIsModalOpen(false)} />
        )}
        {gameOverModal && (
          <GameOverModal
            resetGame={resetGame}
            handleScreenshot={handleScreenshot}
            setGameOverModal={setGameOverModal}
          />
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
