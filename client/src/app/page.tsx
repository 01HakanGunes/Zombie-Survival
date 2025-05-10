"use client";

import { useEffect, useRef } from "react";
import { Game } from "../game/engine/Game";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const game = new Game(canvas);
    gameRef.current = game;

    // Set initial canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    // Handle window resize
    window.addEventListener("resize", updateCanvasSize);

    // Handle game restart on 'R' key press
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "r" && game.isGameOver()) {
        game.restart();
        game.start();
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    // Start the game
    game.start();

    return () => {
      game.stop();
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <main className="w-screen h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
    </main>
  );
}
