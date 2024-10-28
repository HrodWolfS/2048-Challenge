import restore from "../assets/restore.svg";

export default function StartAgain({ resetGame }) {
  return (
    <div className="absolute -bottom-20 right-auto">
      <button
        onClick={resetGame}
        className="bg-gray-300 px-8 py-4 rounded shadow hover:bg-gray-600"
      >
        <img src={restore} alt="Recommencer" className="w-10 h-10" />
      </button>
    </div>
  );
}
