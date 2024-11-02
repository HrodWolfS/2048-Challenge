const GameOverModal = ({ resetGame, handleScreenshot }) => (
  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 font-bebas">
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
);

export default GameOverModal;
