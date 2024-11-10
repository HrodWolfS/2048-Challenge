const WinModal = ({ resetGame, setModalWinOpen, handleScreenshot }) => (
  <div className="absolute inset-0 z-30 flex items-center justify-center text-orange-400 bg-black bg-opacity-50 font-bebas">
    <div className="bg-gradient-to-b from-slate-700 to-gray-600 border border-orange-400 p-8 rounded-md shadow-lg text-center">
      <h2 className="text-lg sm:text-2xl mb-4">
        Serieux ?! je pensais pas que tu y arriverais...
      </h2>
      <p className="text-sm sm:text-base text-white mb-2">
        Tu prevois quoi pour la suite ?
      </p>
      <button
        onClick={resetGame}
        className="font-bebas text-sm sm:text-base px-4 py-2 text-orange-400 bg-gradient-to-t from-slate-700 to-gray-600 border-b border-orange-400 cursor-pointer rounded-md shadow-shadowBtn hover:border hover:border-orange-400 hover:shadow-sm"
      >
        Recommencer
      </button>
      <button
        onClick={() => setModalWinOpen(false)}
        className="px-4 py-2 ml-4 mt-3 text-sm sm:text-base bg-gradient-to-t from-slate-700 to-gray-600 text-green-400 rounded cursor-pointer border-b border-green-400 shadow-shadowBtn hover:border hover:border-green-400 hover:shadow-sm"
      >
        Continuer
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

export default WinModal;
