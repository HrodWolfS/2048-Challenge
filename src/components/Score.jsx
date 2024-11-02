export default function Score({ score }) {
  return (
    <div className="absolute sm:-top-20 -top-16 left-0  text-lg italic text-orange-400 bg-gradient-to-b from-slate-700 to-gray-600 border-t border-orange-400 px-5 sm:px-8 py-1 rounded-md font-bebas">
      <div className="flex flex-col items-center text-sm sm:text-xl">
        <p>Score : </p>
        <p>{score}</p>
      </div>
    </div>
  );
}
