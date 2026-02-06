import React, { useEffect, useRef } from 'react';
import './ConstellationBackground.css';

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

const ConstellationBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationFrame = useRef<number | undefined>(undefined);
  const time = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initStars();
    };

    // Initialize stars with constellation patterns
    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 8000);
      starsRef.current = [];

      // Create constellation clusters
      const clusterCount = Math.floor(starCount / 6);
      
      for (let cluster = 0; cluster < clusterCount; cluster++) {
        // Random cluster center
        const centerX = Math.random() * canvas.width;
        const centerY = Math.random() * canvas.height;
        const clusterRadius = 100 + Math.random() * 100;
        const starsInCluster = 5 + Math.floor(Math.random() * 3);
        
        // Determine cluster color (alternating blue and gold clusters)
        const clusterColor: 'blue' | 'gold' = cluster % 2 === 0 ? 'blue' : 'gold';

        for (let i = 0; i < starsInCluster; i++) {
          const angle = (i / starsInCluster) * Math.PI * 2;
          const distance = Math.random() * clusterRadius;
          
          starsRef.current.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            size: Math.random() * 2 + 0.8,
            opacity: Math.random() * 0.4 + 0.4,
            twinkleSpeed: Math.random() * 0.06 + 0.03,
            vx: (Math.random() - 0.5) * 0.24,
            vy: (Math.random() - 0.5) * 0.24,
            color: clusterColor,
          });
        }
      }

      // Add some scattered random stars
      const randomStars = Math.floor(starCount * 0.3);
      for (let i = 0; i < randomStars; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.2,
          twinkleSpeed: Math.random() * 0.06 + 0.03,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          color: Math.random() > 0.5 ? 'blue' : 'gold',
        });
      }

      // Create connections between nearby stars (constellation lines)
      connectionsRef.current = [];
      const maxDistance = 120;

      for (let i = 0; i < starsRef.current.length; i++) {
        const star1 = starsRef.current[i];
        let connectionsForStar = 0;
        const maxConnectionsPerStar = 3;

        for (let j = i + 1; j < starsRef.current.length; j++) {
          if (connectionsForStar >= maxConnectionsPerStar) break;
          
          const star2 = starsRef.current[j];
          const distance = Math.sqrt(
            Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2)
          );

          // Connect stars of same color that are close together
          if (distance < maxDistance && star1.color === star2.color && Math.random() > 0.7) {
            connectionsRef.current.push({
              from: i,
              to: j,
              opacity: 0.2,
            });
            connectionsForStar++;
          }
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      time.current += 0.04;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      starsRef.current.forEach((star, index) => {
        // Slow drift
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Twinkling effect
        const twinkle = Math.sin(time.current * star.twinkleSpeed + index) * 0.3 + 0.7;
        const currentOpacity = star.opacity * twinkle;

        // Draw star with blue or gold glow
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 3
        );
        
        if (star.color === 'blue') {
          gradient.addColorStop(0, `rgba(129, 198, 233, ${currentOpacity})`);
          gradient.addColorStop(0.4, `rgba(79, 163, 209, ${currentOpacity * 0.6})`);
          gradient.addColorStop(1, 'rgba(79, 163, 209, 0)');
        } else {
          gradient.addColorStop(0, `rgba(255, 235, 200, ${currentOpacity})`);
          gradient.addColorStop(0.4, `rgba(201, 162, 77, ${currentOpacity * 0.6})`);
          gradient.addColorStop(1, 'rgba(201, 162, 77, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw bright center
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.9})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw constellation lines
      connectionsRef.current.forEach((connection) => {
        const star1 = starsRef.current[connection.from];
        const star2 = starsRef.current[connection.to];

        if (!star1 || !star2) return;

        const distance = Math.sqrt(
          Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2)
        );

        // Fade lines based on distance
        const maxDistance = 120;
        const lineOpacity = connection.opacity * (1 - distance / maxDistance);

        if (lineOpacity > 0) {
          // Create gradient line based on star colors
          const gradient = ctx.createLinearGradient(
            star1.x, star1.y,
            star2.x, star2.y
          );
          
          if (star1.color === 'blue') {
            gradient.addColorStop(0, `rgba(79, 163, 209, ${lineOpacity * star1.opacity * 0.8})`);
            gradient.addColorStop(0.5, `rgba(129, 198, 233, ${lineOpacity * 0.9})`);
            gradient.addColorStop(1, `rgba(79, 163, 209, ${lineOpacity * star2.opacity * 0.8})`);
          } else {
            gradient.addColorStop(0, `rgba(201, 162, 77, ${lineOpacity * star1.opacity * 0.8})`);
            gradient.addColorStop(0.5, `rgba(230, 210, 150, ${lineOpacity * 0.9})`);
            gradient.addColorStop(1, `rgba(201, 162, 77, ${lineOpacity * star2.opacity * 0.8})`);
          }

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(star1.x, star1.y);
          ctx.lineTo(star2.x, star2.y);
          ctx.stroke();
        }
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="constellation-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

export default ConstellationBackground;
