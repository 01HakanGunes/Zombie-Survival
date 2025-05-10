export class Player {
  private x: number;
  private y: number;
  private speed: number;
  private radius: number;
  private health: number;
  private maxHealth: number;
  private angle: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.speed = 200; // pixels per second
    this.radius = 20;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.angle = 0;
  }

  public update(
    deltaTime: number,
    keys: Set<string>,
    mouseX: number,
    mouseY: number
  ): void {
    // Update player position based on WASD keys
    if (keys.has("w") || keys.has("ArrowUp")) this.y -= this.speed * deltaTime;
    if (keys.has("s") || keys.has("ArrowDown"))
      this.y += this.speed * deltaTime;
    if (keys.has("a") || keys.has("ArrowLeft"))
      this.x -= this.speed * deltaTime;
    if (keys.has("d") || keys.has("ArrowRight"))
      this.x += this.speed * deltaTime;

    // Update player angle based on mouse position
    this.angle = Math.atan2(mouseY - this.y, mouseX - this.x);
  }

  public render(ctx: CanvasRenderingContext2D): void {
    // Draw player body
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#4CAF50";
    ctx.fill();
    ctx.closePath();

    // Draw player direction indicator
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x + Math.cos(this.angle) * (this.radius + 10),
      this.y + Math.sin(this.angle) * (this.radius + 10)
    );
    ctx.strokeStyle = "#2E7D32";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    // Draw health bar
    this.renderHealthBar(ctx);
  }

  private renderHealthBar(ctx: CanvasRenderingContext2D): void {
    const barWidth = 40;
    const barHeight = 5;
    const barY = this.y - this.radius - 10;

    // Background
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(this.x - barWidth / 2, barY, barWidth, barHeight);

    // Health
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(
      this.x - barWidth / 2,
      barY,
      (this.health / this.maxHealth) * barWidth,
      barHeight
    );
  }

  public getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  public takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount);
  }

  public heal(amount: number): void {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }

  public isDead(): boolean {
    return this.health <= 0;
  }
}
