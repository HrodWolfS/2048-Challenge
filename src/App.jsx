//import html2canvas from "html2canvas";
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
        setModalWinOpen(true);
        setContinueGame(true);
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
    }
  };

  const resetGame = () => {
    setScore(0);
    initializeGame();
    setContinueGame(false);
    setModalWinOpen(false);
  };

  const isGameOver = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cell = grid[i][j];
        if (cell === 0) {
          return false;
        }
        if (j < grid[i].length - 1 && cell === grid[i][j + 1]) {
          return false;
        }
        if (i < grid.length - 1 && cell === grid[i + 1][j]) {
          return false;
        }
      }
    }
    return true;
  };

  const youWin = (currentGrid) => {
    for (let row of currentGrid) {
      if (!ContinueGame) {
        if (row.includes(2048)) {
          // * Pour modifier la valeur si tu veux gagner plus facilement
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

  return (
    <>
      <div
        onClick={closeModal}
        className="relative flex min-h-screen items-center justify-center bg-transparent  z-0"
      >
        <Background />
        <Header handleModalClick={handleModalClick} closeModal={closeModal} />
        {/* MODAL */}
        {isModalOpen && (
          <TutorialModal closeModal={() => setIsModalOpen(false)} />
        )}
        {isGameOver() && (
          <GameOverModal
            resetGame={resetGame}
            handleScreenshot={handleScreenshot}
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
        <div className="relative flex flex-col items-center ">
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
