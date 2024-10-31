function TutorialModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-1 right-24 h-100 w-[340px] bg-gray-700 text-orange-400 z-20 rounded-md shadow-lg">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-md shadow-lg"
      >
        X
      </button>
      <div
        className="bg-gray-700 p-8 rounded-md shadow-md text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-center">Serieux ?! 😲</h2>
        <br />
        <p>
          Tu a vraiment besoin de ce tutoriel ?! Ma fille de 8 ans a compris
          toute seul...
        </p>
      </div>
    </div>
  );
}

export default TutorialModal;
