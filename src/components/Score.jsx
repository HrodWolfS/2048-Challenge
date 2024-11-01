export default function Score({ score }) {
  return (
    <div className="absolute sm:-top-16 -top-12 left-0 text-lg italic text-orange-400 bg-gray-700 border border-orange-400 px-5 sm:px-8 py-1 rounded-md font-bebas">
      <div className="flex flex-col items-center text-sm sm:text-xl">
        <p>Score : </p>
        <p>{score}</p>
      </div>
    </div>
  );
}
