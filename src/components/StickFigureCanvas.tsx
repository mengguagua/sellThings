import { useEffect, useRef } from "react";

type LoquatState = {
  x: number;
  targetX: number;
  velocity: number;
  phase: number;
  rotation: number;
  roll: number;
};

function drawLoquat(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  phase: number,
  rotation: number,
) {
  const breath = 1 + Math.sin(phase * 0.72) * 0.018;
  const sway = Math.sin(phase * 0.56) * 0.045;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(rotation + sway);
  ctx.scale(breath, breath);

  const fruitGradient = ctx.createRadialGradient(
    -radius * 0.32,
    -radius * 0.36,
    radius * 0.12,
    0,
    0,
    radius * 1.18,
  );
  fruitGradient.addColorStop(0, "#fff4b7");
  fruitGradient.addColorStop(0.34, "#f6d66a");
  fruitGradient.addColorStop(0.66, "#e9a52f");
  fruitGradient.addColorStop(0.88, "#c77916");
  fruitGradient.addColorStop(1, "#8c4d12");

  ctx.fillStyle = fruitGradient;
  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.98);
  ctx.bezierCurveTo(radius * 0.66, -radius * 0.94, radius * 0.96, -radius * 0.28, radius * 0.83, radius * 0.28);
  ctx.bezierCurveTo(radius * 0.69, radius * 0.88, radius * 0.18, radius * 1.08, -radius * 0.2, radius * 0.9);
  ctx.bezierCurveTo(-radius * 0.82, radius * 0.62, -radius * 0.98, -radius * 0.18, -radius * 0.66, -radius * 0.66);
  ctx.bezierCurveTo(-radius * 0.48, -radius * 0.92, -radius * 0.18, -radius * 1.02, 0, -radius * 0.98);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(111, 63, 12, 0.32)";
  ctx.lineWidth = Math.max(1.5, radius * 0.024);
  ctx.stroke();

  ctx.globalAlpha = 0.72;
  for (let i = 0; i < 34; i += 1) {
    const angle = i * 2.399;
    const distance = radius * (0.16 + ((i * 37) % 74) / 100);
    const x = Math.cos(angle) * distance * 0.72;
    const y = Math.sin(angle) * distance * 0.82;
    if (y < -radius * 0.82 || y > radius * 0.84) continue;
    ctx.fillStyle = i % 3 === 0 ? "rgba(122,61,10,0.28)" : "rgba(255,247,198,0.38)";
    ctx.beginPath();
    ctx.arc(x, y, Math.max(1.1, radius * 0.011), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.strokeStyle = "#5f4a2d";
  ctx.lineWidth = Math.max(4, radius * 0.045);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-radius * 0.08, -radius * 0.88);
  ctx.bezierCurveTo(-radius * 0.22, -radius * 1.18, -radius * 0.04, -radius * 1.44, radius * 0.22, -radius * 1.6);
  ctx.stroke();

  ctx.fillStyle = "#5f6f3a";
  ctx.beginPath();
  ctx.ellipse(radius * 0.45, -radius * 1.43, radius * 0.38, radius * 0.15, -0.48, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(36,64,23,0.22)";
  ctx.lineWidth = Math.max(1, radius * 0.012);
  ctx.stroke();

  ctx.restore();
}

export default function StickFigureCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state: LoquatState = {
      x: 0,
      targetX: 0,
      velocity: 0,
      phase: 0,
      rotation: 0,
      roll: 0,
    };

    let width = 0;
    let height = 0;
    let animationId = 0;
    let disposed = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!state.x) {
        state.x = width / 2;
        state.targetX = width / 2;
      }
    };

    const setTarget = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      const radius = Math.max(96, Math.min(172, width * 0.16));
      const next = clientX - rect.left;
      state.targetX = Math.max(radius * 0.9, Math.min(width - radius * 0.9, next));
    };

    const render = () => {
      if (disposed) return;

      const isSmallScreen = width < 640;
      const radius = isSmallScreen
        ? Math.max(62, Math.min(82, width * 0.2, height * 0.13))
        : Math.max(92, Math.min(178, width * 0.16, height * 0.22));
      const centerY = isSmallScreen ? height * 0.68 : height * 0.56;
      const distance = state.targetX - state.x;

      state.velocity = distance * 0.075;
      state.x += state.velocity;
      state.phase += 0.028 + Math.min(0.04, Math.abs(state.velocity) * 0.002);
      const targetRoll = Math.max(-0.58, Math.min(0.58, state.velocity / 46));
      state.roll += (targetRoll - state.roll) * 0.16;
      state.rotation += state.velocity / Math.max(74, radius * 1.2);
      state.rotation *= 0.992;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#f7f2e8";
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(width / 2, height * 0.52, radius * 0.2, width / 2, height * 0.52, Math.max(width, height) * 0.55);
      glow.addColorStop(0, "rgba(255,249,228,0.96)");
      glow.addColorStop(0.62, "rgba(247,242,232,0.86)");
      glow.addColorStop(1, "rgba(235,229,216,1)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(0, 0, 0, 0.045)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width * 0.16, centerY + radius * 1.18);
      ctx.lineTo(width * 0.84, centerY + radius * 1.18);
      ctx.stroke();

      const shadowStretch = 1 + Math.min(0.28, Math.abs(state.velocity) / 140);
      ctx.fillStyle = `rgba(79, 68, 44, ${0.16 - Math.min(0.045, Math.abs(state.velocity) / 900)})`;
      ctx.beginPath();
      ctx.ellipse(
        state.x,
        centerY + radius * 1.04,
        radius * 0.92 * shadowStretch,
        radius * 0.16,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      drawLoquat(ctx, state.x, centerY, radius, state.phase, state.rotation + state.roll);

      animationId = requestAnimationFrame(render);
    };

    resize();
    const handlePointer = (event: PointerEvent) => setTarget(event.clientX);
    canvas.addEventListener("pointermove", handlePointer);
    canvas.addEventListener("pointerdown", handlePointer);
    window.addEventListener("pointermove", handlePointer);
    window.addEventListener("pointerdown", handlePointer);
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("pointermove", handlePointer);
      canvas.removeEventListener("pointerdown", handlePointer);
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("pointerdown", handlePointer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full touch-none"
      aria-label="黑白枇杷会轻微呼吸，并跟随鼠标左右滚动"
    />
  );
}
