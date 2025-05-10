export class Zombie {
  private x: number;
  private y: number;
  private speed: number;
  private radius: number;
  private health: number;
  private damage: number;
  private target: { x: number; y: number };

  constructor(x: number, y: number, targetPosition: { x: number; y: number }) {
    this.x = x;
    this.y = y;
    this.speed = 100; // pixels per second
    this.radius = 15;
    this.health = 50;
    this.damage = 10;
    this.target = targetPosition;
  }

  public update(
    deltaTime: number,
    playerPosition: { x: number; y: number }
  ): void {
    this.target = playerPosition;

    // Calculate direction to player
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      // Normalize and apply movement
      this.x += (dx / distance) * this.speed * deltaTime;
      this.y += (dy / distance) * this.speed * deltaTime;
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    // Draw zombie body
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#f44336";
    ctx.fill();
    ctx.closePath();

    // Draw health bar
    this.renderHealthBar(ctx);
  }

  private renderHealthBar(ctx: CanvasRenderingContext2D): void {
    const barWidth = 30;
    const barHeight = 4;
    const barY = this.y - this.radius - 8;

    // Background
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(this.x - barWidth / 2, barY, barWidth, barHeight);

    // Health
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(
      this.x - barWidth / 2,
      barY,
      (this.health / 50) * barWidth,
      barHeight
    );
  }

  public takeDamage(amount: number): void {
    this.health -= amount;
  }

  public isDead(): boolean {
    return this.health <= 0;
  }

  public getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  public getDamage(): number {
    return this.damage;
  }

  public getRadius(): number {
    return this.radius;
  }
}
