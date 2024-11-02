export default function StartAgain({ resetGame }) {
  return (
    <div className="absolute sm:-bottom-20 -bottom-12 right-auto cursor-pointer">
      <button
        onClick={resetGame}
        className="bg-gradient-to-t from-slate-700 to-gray-600 text-orange-400  px-4 py-2 sm:px-8 sm:py-4 rounded  border-b border-orange-400 shadow-shadowBtn font-bebas text-sm sm:text-xl hover:border hover:border-orange-400 hover:shadow-sm"
      >
        Recommencer
      </button>
    </div>
  );
}
