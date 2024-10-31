import { useState } from "react";

export default function Record({ newScore }) {
  const [record, setRecord] = useState(0);
  if (newScore > record) {
    setRecord(newScore);
  }

  return (
    <div className="absolute -top-20 right-0 text-lg text-orange-400 bg-gray-700 px-8 py-1 rounded-md font-bebas">
      <div className="flex flex-col items-center">
        <p className="text-xl">Record : </p>
        <p className="text-2xl">{record}</p>
      </div>
    </div>
  );
}
