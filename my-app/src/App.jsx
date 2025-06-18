import React, { useState, useEffect } from "react";
import Frog from "./assets/frog.png"; 

export default function App() {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bgGradient, setBgGradient] = useState("linear-gradient(to right, #a8edea, #fed6e3)");

  const gradients = [
    "linear-gradient(to right, #a8edea, #fed6e3)",
    "linear-gradient(to right, #ffecd2, #fcb69f)",
    "linear-gradient(to right, #ff9a9e, #fad0c4)",
    "linear-gradient(to right, #f6d365, #fda085)",
    "linear-gradient(to right, #d4fc79, #96e6a1)",
    "linear-gradient(to right, #84fab0, #8fd3f4)",
  ];

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsModalOpen(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const moveFrog = () => {
    const top = Math.random() * 80 + "%";
    const left = Math.random() * 80 + "%";
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    setPosition({ top, left });
    setScore(score + 1);
    setBgGradient(randomGradient); // Background linear gradient o‘zgaradi
  };

  const resetGame = () => {
    setTimeLeft(30);
    setScore(0);
    setIsModalOpen(false);
    setBgGradient("linear-gradient(to right, #a8edea, #fed6e3)");
  };

  return (
    <div
      className="relative h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ background: bgGradient }}
    >
      <h1 className="text-3xl font-bold mb-4 text-white drop-shadow">Qurboqa o‘yini</h1>
      <p className="text-xl mb-2 text-white drop-shadow">Ball: {score}</p>
      <p className="text-lg mb-6 text-white drop-shadow">Vaqt: {timeLeft}s</p>

      <img
        onClick={moveFrog}
        src={Frog}
        alt="Frog"
        className="w-20 h-20 cursor-pointer absolute transition-all duration-300 select-none"
        style={{ top: position.top, left: position.left }}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center">
            <h2 className="text-2xl font-bold mb-2">O'yin tugadi!</h2>
            <p className="mb-4">Sizning ballingiz: {score}</p>
            <button
              onClick={resetGame}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Qaytadan boshlash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
