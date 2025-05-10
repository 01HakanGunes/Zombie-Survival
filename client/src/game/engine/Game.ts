import { Player } from "../entities/Player";
import { Zombie } from "../entities/Zombie";
import { GameEngine } from "./GameEngine";

export class Game extends GameEngine {
  private player: Player;
  private zombies: Zombie[];
  private wave: number;
  private score: number;
  private pressedKeys: Set<string>;
  private mousePosition: { x: number; y: number };
  private gameOver: boolean;
  private lastZombieSpawn: number;
  private zombieSpawnInterval: number;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.pressedKeys = new Set();
    this.mousePosition = { x: 0, y: 0 };
    this.zombies = [];
    this.wave = 1;
    this.score = 0;
    this.gameOver = false;
    this.lastZombieSpawn = 0;
    this.zombieSpawnInterval = 2000; // 2 seconds

    // Initialize player in the center of the screen
    this.player = new Player(canvas.width / 2, canvas.height / 2);

    // Set up event listeners
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    window.addEventListener("keydown", (e) => this.pressedKeys.add(e.key));
    window.addEventListener("keyup", (e) => this.pressedKeys.delete(e.key));
    window.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mousePosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    });
  }

  protected update(deltaTime: number): void {
    if (this.gameOver) return;

    // Update player
    this.player.update(
      deltaTime,
      this.pressedKeys,
      this.mousePosition.x,
      this.mousePosition.y
    );

    // Update zombies
    this.updateZombies(deltaTime);

    // Check collisions
    this.checkCollisions();

    // Spawn new zombies
    this.spawnZombies(deltaTime);
  }

  private updateZombies(deltaTime: number): void {
    const playerPos = this.player.getPosition();
    this.zombies.forEach((zombie) => {
      zombie.update(deltaTime, playerPos);
    });

    // Remove dead zombies and update score
    this.zombies = this.zombies.filter((zombie) => {
      if (zombie.isDead()) {
        this.score += 10;
        return false;
      }
      return true;
    });
  }

  private checkCollisions(): void {
    const playerPos = this.player.getPosition();

    this.zombies.forEach((zombie) => {
      const zombiePos = zombie.getPosition();
      const dx = playerPos.x - zombiePos.x;
      const dy = playerPos.y - zombiePos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // If zombie touches player
      if (distance < zombie.getRadius() + 20) {
        // 20 is player radius
        this.player.takeDamage(zombie.getDamage() * 0.5); // Reduce damage for better gameplay
        if (this.player.isDead()) {
          this.gameOver = true;
        }
      }
    });
  }

  private spawnZombies(deltaTime: number): void {
    this.lastZombieSpawn += deltaTime * 1000; // Convert to milliseconds

    if (this.lastZombieSpawn >= this.zombieSpawnInterval) {
      this.lastZombieSpawn = 0;

      // Spawn more zombies as waves progress
      const zombiesToSpawn = Math.min(3 + Math.floor(this.wave / 2), 10);

      for (let i = 0; i < zombiesToSpawn; i++) {
        const spawnPoint = this.getRandomSpawnPoint();
        this.zombies.push(
          new Zombie(spawnPoint.x, spawnPoint.y, this.player.getPosition())
        );
      }

      // Increase wave if enough zombies have been spawned
      if (this.score > this.wave * 100) {
        this.wave++;
        this.zombieSpawnInterval = Math.max(500, 2000 - this.wave * 100);
      }
    }
  }

  private getRandomSpawnPoint(): { x: number; y: number } {
    const edge = Math.floor(Math.random() * 4);
    const canvas = this.canvas;

    switch (edge) {
      case 0: // Top
        return { x: Math.random() * canvas.width, y: -30 };
      case 1: // Right
        return { x: canvas.width + 30, y: Math.random() * canvas.height };
      case 2: // Bottom
        return { x: Math.random() * canvas.width, y: canvas.height + 30 };
      default: // Left
        return { x: -30, y: Math.random() * canvas.height };
    }
  }

  protected render(): void {
    super.render();

    // Render zombies
    this.zombies.forEach((zombie) => zombie.render(this.ctx));

    // Render player
    this.player.render(this.ctx);

    // Render UI
    this.renderUI();
  }

  private renderUI(): void {
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "24px Arial";
    this.ctx.fillText(`Wave: ${this.wave}`, 20, 40);
    this.ctx.fillText(`Score: ${this.score}`, 20, 70);

    if (this.gameOver) {
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = "#fff";
      this.ctx.font = "48px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "GAME OVER",
        this.canvas.width / 2,
        this.canvas.height / 2
      );
      this.ctx.font = "24px Arial";
      this.ctx.fillText(
        `Final Score: ${this.score} - Wave: ${this.wave}`,
        this.canvas.width / 2,
        this.canvas.height / 2 + 50
      );
      this.ctx.fillText(
        "Press R to Restart",
        this.canvas.width / 2,
        this.canvas.height / 2 + 90
      );
    }
  }

  public restart(): void {
    this.player = new Player(this.canvas.width / 2, this.canvas.height / 2);
    this.zombies = [];
    this.wave = 1;
    this.score = 0;
    this.gameOver = false;
    this.lastZombieSpawn = 0;
    this.zombieSpawnInterval = 2000;
  }

  public isGameOver(): boolean {
    return this.gameOver;
  }
}
