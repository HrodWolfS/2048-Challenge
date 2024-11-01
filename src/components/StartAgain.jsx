export default function StartAgain({ resetGame }) {
  return (
    <div className="absolute sm:-bottom-20 -bottom-12 right-auto cursor-pointer">
      <button
        onClick={resetGame}
        className="bg-gray-700 text-orange-400 border border-orange-400 px-4 py-2 sm:px-8 sm:py-4 rounded shadow-lg font-bebas text-sm sm:text-xl hover:bg-orange-400 hover:text-gray-700 hover:border-gray-700"
      >
        Recommencer
      </button>
    </div>
  );
}
