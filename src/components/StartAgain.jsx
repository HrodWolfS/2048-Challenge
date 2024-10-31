export default function StartAgain({ resetGame }) {
  return (
    <div className="absolute -bottom-20 right-auto">
      <button
        onClick={resetGame}
        className="bg-gray-700 text-orange-400 px-8 py-4 rounded shadow-lg font-bebas text-xl hover:bg-gray-600"
      >
        Recommencer
      </button>
    </div>
  );
}
