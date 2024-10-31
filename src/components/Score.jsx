export default function Score({ score }) {
  return (
    <div className="absolute -top-16 left-0 text-lg text-orange-400 bg-gray-700 px-8 py-1 rounded-md font-bebas">
      <div className="flex flex-col items-center">
        <p className="text-xl">Score : </p>
        <p className="text-2xl">{score}</p>
      </div>
    </div>
  );
}
