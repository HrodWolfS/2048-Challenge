const GameOverModal = ({ resetGame, handleScreenshot }) => (
  <div className="absolute inset-0 z-10 flex items-center justify-center text-orange-400 bg-black bg-opacity-50 font-bebas">
    <div className=" bg-gradient-to-b from-slate-700 to-gray-600 border border-orange-400 p-8 rounded-md shadow-lg text-center">
      <h2 className="sm:text-2xl font-rubik mb-4">Game Over</h2>
      <p className="sm:text-xl text-sm text-slate-200">
        je suis sûr que tu peux faire mieux
      </p>
      <button
        onClick={resetGame}
        className="font-bebas text-sm sm:text-base px-4 py-2 text-orange-400 bg-gradient-to-t from-slate-700 to-gray-600 border-b border-orange-400 cursor-pointer rounded-md shadow-shadowBtn hover:border hover:border-orange-400 hover:shadow-sm animate-scale-pulse"
      >
        Recommencer
      </button>
      <button
        onClick={handleScreenshot}
        className="px-4 py-2 ml-4 mt-3 text-sm sm:text-base bg-gradient-to-t from-slate-700 to-gray-600 text-blue-400 rounded cursor-pointer border-b border-blue-400 shadow-shadowBtn hover:border hover:border-blue-400 hover:shadow-sm"
      >
        Capturer ce moment
      </button>
    </div>
  </div>
);

export default GameOverModal;
