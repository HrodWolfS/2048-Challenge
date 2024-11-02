function TutorialModal({ closeModal }) {
  return (
    <div className="absolute top-2 sm:right-24 right-auto h-100 w-[340px] bg-gradient-to-b from-slate-700 to-gray-600 text-orange-400 z-20 border border-orange-400 rounded-md shadow-lg">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-md shadow-lg"
      >
        X
      </button>
      <div
        className="p-8 rounded-md shadow-md text-center text-sm sm:text-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-center">Tu plaisantes ?! 😲</h2>
        <br />
        <p>Debrouille toi ! Ma fille de 8 ans a compris toute seul...</p>
      </div>
    </div>
  );
}

export default TutorialModal;
