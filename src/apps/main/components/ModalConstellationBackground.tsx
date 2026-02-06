import React, { useEffect, useRef, useState } from 'react';

/**
 * Lightweight constellation background for modals.
 * Mobile-optimized: fewer stars, capped pixel ratio, reduced complexity.
 */

const MOBILE_BREAKPOINT = 768;

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
  color: 'blue' | 'gold';
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
}

const ModalConstellationBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);
  const lastFrameRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      // Desktop: match main ConstellationBackground (uses offsetWidth/height = CSS pixels)
      // Mobile: dpr 1 for performance
      const dpr = 1;
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);
      canvas.width = w;
      canvas.height = h;
      initStars(w, h);
    };

    const initStars = (w: number, h: number) => {
      const area = w * h;
      // Desktop: match main ConstellationBackground (no cap). Mobile: reduced.
      const starCount = isMobile
        ? Math.min(Math.floor(area / 14000), 70)
        : Math.floor(area / 8000);
      starsRef.current = [];

      const clusterCount = Math.floor(starCount / 6);
      const maxDistance = isMobile ? 80 : 120;
      const starsInCluster = isMobile ? 3 + Math.floor(Math.random() * 2) : 5 + Math.floor(Math.random() * 3);
      const starSizeMin = isMobile ? 0.6 : 0.8;
      const starSizeRange = isMobile ? 1.5 : 2;
      const velocity = isMobile ? 0.15 : 0.24;

      for (let cluster = 0; cluster < clusterCount; cluster++) {
        const centerX = Math.random() * w;
        const centerY = Math.random() * h;
        const clusterRadius = isMobile ? 60 + Math.random() * 60 : 100 + Math.random() * 100;
        const clusterColor: 'blue' | 'gold' = cluster % 2 === 0 ? 'blue' : 'gold';

        for (let i = 0; i < starsInCluster; i++) {
          const angle = (i / starsInCluster) * Math.PI * 2;
          const distance = Math.random() * clusterRadius;
          starsRef.current.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            size: Math.random() * starSizeRange + starSizeMin,
            opacity: Math.random() * 0.4 + 0.4,
            twinkleSpeed: Math.random() * 0.06 + 0.03,
            vx: (Math.random() - 0.5) * velocity,
            vy: (Math.random() - 0.5) * velocity,
            color: clusterColor,
          });
        }
      }

      const randomStars = Math.floor(starCount * 0.3);
      const randomSizeMin = isMobile ? 0.4 : 0.5;
      const randomSizeRange = isMobile ? 1.2 : 1.5;
      for (let i = 0; i < randomStars; i++) {
        starsRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * randomSizeRange + randomSizeMin,
          opacity: Math.random() * 0.3 + 0.2,
          twinkleSpeed: Math.random() * 0.06 + 0.03,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          color: Math.random() > 0.5 ? 'blue' : 'gold',
        });
      }

      connectionsRef.current = [];
      const maxConnPerStar = isMobile ? 2 : 3;
      for (let i = 0; i < starsRef.current.length; i++) {
        const star1 = starsRef.current[i];
        let connectionsForStar = 0;

        for (let j = i + 1; j < starsRef.current.length && connectionsForStar < maxConnPerStar; j++) {
          const star2 = starsRef.current[j];
          const d = Math.hypot(star1.x - star2.x, star1.y - star2.y);
          if (d < maxDistance && star1.color === star2.color && Math.random() > 0.7) {
            connectionsRef.current.push({ from: i, to: j, opacity: 0.2 });
            connectionsForStar++;
          }
        }
      }
    };

    const animate = (now: number) => {
      if (!ctx || !canvas) return;

      // Throttle to ~30fps on mobile for battery; respect prefers-reduced-motion
      if ((isMobile || reducedMotion) && now - lastFrameRef.current < 32) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameRef.current = now;
      timeRef.current += 0.04;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      starsRef.current.forEach((star, idx) => {
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = w;
        if (star.x > w) star.x = 0;
        if (star.y < 0) star.y = h;
        if (star.y > h) star.y = 0;

        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + idx) * 0.3 + 0.7;
        const opacity = star.opacity * twinkle;

        const grad = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 3
        );
        if (star.color === 'blue') {
          grad.addColorStop(0, `rgba(129, 198, 233, ${opacity})`);
          grad.addColorStop(0.4, `rgba(79, 163, 209, ${opacity * 0.6})`);
          grad.addColorStop(1, 'rgba(79, 163, 209, 0)');
        } else {
          grad.addColorStop(0, `rgba(255, 235, 200, ${opacity})`);
          grad.addColorStop(0.4, `rgba(201, 162, 77, ${opacity * 0.6})`);
          grad.addColorStop(1, 'rgba(201, 162, 77, 0)');
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${opacity * 0.9})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      connectionsRef.current.forEach((conn) => {
        const s1 = starsRef.current[conn.from];
        const s2 = starsRef.current[conn.to];
        if (!s1 || !s2) return;
        const d = Math.hypot(s1.x - s2.x, s1.y - s2.y);
        const maxD = isMobile ? 80 : 120;
        const lineOpacity = conn.opacity * (1 - d / maxD);
        if (lineOpacity > 0) {
          const grad = ctx.createLinearGradient(s1.x, s1.y, s2.x, s2.y);
          if (s1.color === 'blue') {
            grad.addColorStop(0, `rgba(79, 163, 209, ${lineOpacity * s1.opacity * 0.8})`);
            grad.addColorStop(0.5, `rgba(129, 198, 233, ${lineOpacity * 0.9})`);
            grad.addColorStop(1, `rgba(79, 163, 209, ${lineOpacity * s2.opacity * 0.8})`);
          } else {
            grad.addColorStop(0, `rgba(201, 162, 77, ${lineOpacity * s1.opacity * 0.8})`);
            grad.addColorStop(0.5, `rgba(230, 210, 150, ${lineOpacity * 0.9})`);
            grad.addColorStop(1, `rgba(201, 162, 77, ${lineOpacity * s2.opacity * 0.8})`);
          }
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.stroke();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="modal-constellation-canvas"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.85,
        contain: 'strict',
        willChange: isMobile ? 'auto' : 'opacity',
      }}
    />
  );
};

export default ModalConstellationBackground;
