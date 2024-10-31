const WinModal = ({ resetGame, setModalWinOpen, handleScreenshot }) => (
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
);

export default WinModal;
