export default function Score({ score }) {
  return (
    <div className="absolute -top-20 left-auto text-lg bg-gray-300 px-8 py-3 rounded-md">
      <div className="flex flex-col items-center">
        <p className="font-playwrite text-xl">Score : </p>
        <p className="font-rubik text-2xl">{score}</p>
      </div>
    </div>
  );
}
