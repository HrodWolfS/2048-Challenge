import React from "react";
import "./Background.css";

const Background = React.memo(() => {
  const colors = {
    2: "#60a5fa",
    4: "#38bdf8",
    8: "#22d3ee",
    16: "#2dd4bf",
    32: "#34d399",
    64: "#4ade80",
    128: "#a3e635",
    256: "#facc15",
    512: "#fbbf24",
    1024: "#fb923c",
    2048: "#f87171",
  };

  return (
    <div className="absolute inset-0 -z-10 bg-gray-600 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, index) => {
        const randomX = Math.random(); // Position horizontale aléatoire
        const randomValue = Math.pow(2, Math.floor(Math.random() * 11)); // Génère des puissances de 2 (2, 4, 8, ..., 2048)
        const randomDuration = `${3 + Math.random() * 5}s`; // Durée d'animation entre 3 et 8 secondes

        return (
          <span
            key={index}
            className="falling-number"
            style={{
              "--random-x": randomX,
              "--random-duration": randomDuration,
              backgroundColor: colors[randomValue] || "#eee4da", // Couleur par défaut
            }}
          >
            {randomValue}
          </span>
        );
      })}
    </div>
  );
});

Background.displayName = "Background";

export default Background;
