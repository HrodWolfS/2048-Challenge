import { useEffect, useState } from "react";

export default function Header({ openModal, closeModal }) {
  const [elapsedTime, setElapsedTime] = useState(0);
  function handleModalClick(e) {
    e.stopPropagation();
    openModal();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to convert seconds to mm:ss format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <header
      onClick={closeModal}
      className="h-16 w-30 flex items-center text-orange-400 pl-7 pb-2 font-bebas bg-gray-500"
    >
      <p className="position absolute">
        <span className="inline-block text-3xl -rotate-12">2048</span>
        <span className="font-rubik relative text-2xl top-2 -left-2 ">
          {" "}
          Challenge
        </span>
      </p>
      <div className="text-2xl text-orange-400 mx-auto italic">
        Temps perdu à essayer de faire 2048 : {formatTime(elapsedTime)}
      </div>
      <button
        onClick={handleModalClick}
        className="font-bebas text-xl absolute right-10 top-auto p-2 bg-gray-700 rounded-md shadow-lg hover:bg-gray-600"
      >
        Turoriel
      </button>
    </header>
  );
}
