import { useEffect, useState } from "react";

export default function Header({ handleModalClick, closeModal }) {
  const [elapsedTime, setElapsedTime] = useState(0);

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
      className="h-16 w-30 flex items-center text-orange-400 pl-7 pb-2 font-bebas"
    >
      <p className="position absolute">
        <span className="inline-block text-3xl -rotate-12">2048</span>
        <span className="font-rubik relative text-2xl top-2 -left-2 ">
          {" "}
          Challenge
        </span>
      </p>
      <div className="p-2 text-xl text-orange-400 border border-orange-400 bg-gray-700 rounded-md shadow mx-auto italic invisible sm:visible">
        <p>Temps perdu à essayer de faire 2048 👉 {formatTime(elapsedTime)}</p>
      </div>
      <button
        onClick={handleModalClick}
        className="font-bebas text-sm sm:text-xl absolute right-10 top-auto p-2 bg-gray-700 border border-orange-400 cursor-pointer rounded-md shadow-lg hover:bg-orange-400 hover:text-gray-700 hover:border-gray-700"
      >
        Turoriel
      </button>
    </header>
  );
}
