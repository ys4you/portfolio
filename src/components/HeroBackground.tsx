import { useEffect, useRef } from "react";

/**
 * Split hero background:
 *  Left  = Game of Life grid (game dev)
 *  Right = Network graph (web / tooling)
 */
export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    // ── Game of Life state (left side) ──
    const cellSize = 18;
    let cols = 0;
    let rows = 0;
    let grid: boolean[][] = [];

    function initGrid() {
      cols = Math.ceil(width / 2 / cellSize);
      rows = Math.ceil(height / cellSize);
      grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.random() < 0.1)
      );
    }

    function stepGrid() {
      const next: boolean[][] = Array.from({ length: rows }, () =>
        Array(cols).fill(false)
      );
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let neighbors = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dy === 0 && dx === 0) continue;
              const ny = (y + dy + rows) % rows;
              const nx = (x + dx + cols) % cols;
              if (grid[ny]![nx]) neighbors++;
            }
          }
          const alive = grid[y]![x]!;
          next[y]![x] = alive
            ? neighbors === 2 || neighbors === 3
            : neighbors === 3;
        }
      }
      grid = next;
    }

    // ── Network graph state (right side) ──
    const CONNECTION_DIST = 180;
    const NODE_LABELS = [
      "REST", "Webhooks", "SMTP", "Hosting", "DB",
      "API", "Auth", "Docker", "Git", "Vite",
      "SQL", "React", "DNS", "WordPress", "PHP",
      "Google Console", "C# Azure", "JSON", "XML",
    ];

    interface NetNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      label: string;
      pulsePhase: number;
    }

    interface Packet {
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
    }

    let nodes: NetNode[] = [];
    let packets: Packet[] = [];

    function initNodes() {
      const halfW = width / 2;
      const count = Math.floor((halfW * height) / 28000);
      const clampedCount = Math.max(10, Math.min(count, 30));
      const shuffled = [...NODE_LABELS].sort(() => Math.random() - 0.5);

      nodes = Array.from({ length: clampedCount }, (_, i) => ({
        x: halfW + 40 + Math.random() * (halfW - 80),
        y: 40 + Math.random() * (height - 80),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 3 + Math.random() * 2,
        label: shuffled[i % shuffled.length]!,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
      packets = [];
    }

    function spawnPacket() {
      if (nodes.length < 2) return;
      const fromIdx = Math.floor(Math.random() * nodes.length);
      let toIdx = Math.floor(Math.random() * nodes.length);
      while (toIdx === fromIdx) toIdx = Math.floor(Math.random() * nodes.length);

      const from = nodes[fromIdx]!;
      const to = nodes[toIdx]!;
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONNECTION_DIST * 1.5) {
        packets.push({
          fromIdx,
          toIdx,
          progress: 0,
          speed: 0.008 + Math.random() * 0.012,
        });
      }
    }

    // ── Resize ──
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initGrid();
      initNodes();
    }

    resize();
    window.addEventListener("resize", resize);

    // ── Animation ──
    let tick = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const halfW = width / 2;

      // ── Left: Game of Life (subtle, ambient) ──
      if (tick % 28 === 0) stepGrid();

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (!grid[y]![x]) continue;
          const px = x * cellSize;
          const distFromCenter = 1 - px / halfW;
          const alpha = 0.04 + distFromCenter * 0.08;
          ctx.fillStyle = `rgba(45, 212, 191, ${alpha})`;
          ctx.fillRect(px + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
        }
      }

      // ── Right: Network graph ──

      // Move nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += 0.02;

        // Bounce off right-side bounds
        if (node.x < halfW + 30 || node.x > width - 30) node.vx *= -1;
        if (node.y < 30 || node.y > height - 30) node.vy *= -1;

        // Gentle random drift
        node.vx += (Math.random() - 0.5) * 0.02;
        node.vy += (Math.random() - 0.5) * 0.02;
        node.vx *= 0.99;
        node.vy *= 0.99;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!;
          const b = nodes[j]!;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.strokeStyle = `rgba(45, 212, 191, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Spawn packets periodically
      if (tick % 40 === 0) spawnPacket();

      // Draw & update packets
      packets = packets.filter((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) return false;

        const from = nodes[p.fromIdx]!;
        const to = nodes[p.toIdx]!;
        const px = from.x + (to.x - from.x) * p.progress;
        const py = from.y + (to.y - from.y) * p.progress;

        // Glowing packet dot
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, 0.9)`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, 0.15)`;
        ctx.fill();

        return true;
      });

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
        const distFromCenter = (node.x - halfW) / halfW;
        const fadeAlpha = Math.min(1, distFromCenter * 1.8);

        // Node circle
        const nodeAlpha = (0.2 + pulse * 0.15) * fadeAlpha;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + pulse * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${nodeAlpha})`;
        ctx.fill();

        // Outer ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 6 + pulse * 3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(45, 212, 191, ${0.05 * fadeAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label
        const labelAlpha = (0.1 + pulse * 0.08) * fadeAlpha;
        ctx.font = '500 9px "JetBrains Mono", monospace';
        ctx.fillStyle = `rgba(45, 212, 191, ${labelAlpha})`;
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y - node.radius - 8);
      }

      ctx.textAlign = "start"; // reset

      // ── Center fade ──
      const grad = ctx.createLinearGradient(halfW - 120, 0, halfW + 120, 0);
      grad.addColorStop(0, "rgba(10, 10, 11, 0)");
      grad.addColorStop(0.35, "rgba(10, 10, 11, 1)");
      grad.addColorStop(0.65, "rgba(10, 10, 11, 1)");
      grad.addColorStop(1, "rgba(10, 10, 11, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(halfW - 120, 0, 240, height);

      tick++;
      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}