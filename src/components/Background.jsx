import React from "react";
import "./Background.css";

const Background = React.memo(() => {
  const colors = {
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f67c5f",
    128: "#f9f79f",
    256: "#f9f379",
    512: "#f9f3b3",
    1024: "#e3e8e3",
    2048: "#edc22b",
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
