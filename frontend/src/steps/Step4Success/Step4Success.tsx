import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

type ConfettiPieceProps = {
  delay: number;
  duration: number;
  startX: number;
  startY: number;
  color: string;
  shape: string;
  size: number;
};

const ConfettiPiece: React.FC<ConfettiPieceProps> = ({
  delay,
  duration,
  startX,
  startY,
  color,
  shape,
  size,
}) => {
  return (
    <div
      className={`${styles.confettiPiece} ${styles[shape]}`}
      style={
        {
          left: `${startX}%`,
          top: `${startY}%`,
          backgroundColor: color,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          width: `${size}px`,
          height: `${size}px`,
          "--particle-color": color,
        } as React.CSSProperties
      }
    />
  );
};

type FireworkBurstProps = {
  delay: number;
  angle: number;
  distance: number;
  color: string;
  shape: string;
  size: number;
};

const FireworkBurst: React.FC<FireworkBurstProps> = ({
  delay,
  angle,
  distance,
  color,
  shape,
  size,
}) => {
  return (
    <div
      className={`${styles.fireworkBurst} ${styles[shape]}`}
      style={
        {
          backgroundColor: color,
          animationDelay: `${delay}s`,
          transform: `rotate(${angle}deg)`,
          "--burst-distance": `${distance}px`,
          "--burst-angle": `${angle}deg`,
          width: `${size}px`,
          height: `${size}px`,
          "--particle-color": color,
        } as React.CSSProperties
      }
    />
  );
};

export const Step4Success: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [triggerFireworks, setTriggerFireworks] = useState(false);

  useEffect(() => {
    const fireworksTimer = setTimeout(() => {
      setTriggerFireworks(true);
    }, 300);

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fireworksTimer);
    };
  }, []);

  const fireworkColors = [
    "#00D4FF", // Bright cyan/blue
    "#FF6B35", // Bright orange
    "#FF1B8D", // Hot pink/magenta
    "#00FF88", // Bright green
    "#FFD700", // Golden yellow
    "#8A2BE2", // Blue violet
    "#FF69B4", // Hot pink
    "#00CED1", // Dark turquoise
    "#FF4500", // Orange red
    "#32CD32", // Lime green
    "#FF1493", // Deep pink
    "#00BFFF", // Deep sky blue
  ];

  const particleShapes = ["circle", "star", "diamond", "triangle", "square"];

  return (
    <div className={styles.container}>
      {/* Confetti explosion from the center */}
      {showConfetti && (
        <div className={styles.confettiContainer}>
          {Array.from({ length: 200 }).map((_, i) => {
            // Calcular posición aleatoria alrededor del centro
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50;
            const startX = 50 + Math.cos(angle) * distance;
            const startY = 50 + Math.sin(angle) * distance;

            return (
              <ConfettiPiece
                key={`confetti-${i}`}
                delay={Math.random() * 2}
                duration={4 + Math.random() * 3}
                startX={startX}
                startY={startY}
                color={fireworkColors[Math.floor(Math.random() * fireworkColors.length)]}
                shape={particleShapes[Math.floor(Math.random() * particleShapes.length)]}
                size={6 + Math.random() * 8}
              />
            );
          })}
        </div>
      )}

      {/* Fireworks Explosion */}
      {triggerFireworks && (
        <div className={styles.explosionContainer}>
          {/* Main central firework burst */}
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (360 / 60) * i;
            const distance = 80 + Math.random() * 120;
            const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
            return (
              <FireworkBurst
                key={`burst-${i}`}
                delay={Math.random() * 0.3}
                angle={angle}
                distance={distance}
                color={color}
                shape={particleShapes[Math.floor(Math.random() * particleShapes.length)]}
                size={4 + Math.random() * 8}
              />
            );
          })}

          {/* Secondary smaller bursts */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (360 / 24) * i + 15; // Offset for variety
            const distance = 40 + Math.random() * 60;
            const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
            return (
              <FireworkBurst
                key={`secondary-${i}`}
                delay={0.5 + Math.random() * 0.4}
                angle={angle}
                distance={distance}
                color={color}
                shape='circle'
                size={3 + Math.random() * 5}
              />
            );
          })}
        </div>
      )}

      {/* Main Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>
          Congrats! You're now a <span className={styles.subscriber}>subscriber!</span>
        </h1>

        <p className={styles.subtitle}>Explore your membership now.</p>

        {/* Central Circle - Matching background color */}
        <div className={styles.centralCircle}>
          <div className={styles.circleInner}></div>
        </div>

        {/* Elimina el botón de continuar o acción final */}
      </div>
    </div>
  );
};
