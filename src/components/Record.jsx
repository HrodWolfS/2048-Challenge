import { useState } from "react";

export default function Record({ newScore }) {
  const [record, setRecord] = useState(0);
  if (newScore > record) {
    setRecord(newScore);
  }

  return (
    <div className="absolute -top-16 sm:-top-20  right-0 text-lg italic text-orange-400 bg-gradient-to-b from-slate-700 to-gray-600 border-t border-orange-400 px-4 sm:px-8 py-1 rounded-md font-bebas">
      <div className="flex flex-col items-center text-sm sm:text-xl">
        <p>Record : </p>
        <p>{record}</p>
      </div>
    </div>
  );
}
