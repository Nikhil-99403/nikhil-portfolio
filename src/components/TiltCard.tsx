import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  dataCursor?: string;
  onClick?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  dataCursor,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -maxTilt;
    const rY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(rX);
    setRotateY(rY);
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="relative"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.01 : 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{ transformStyle: 'preserve-3d' }}
        data-cursor={dataCursor}
        className={`relative rounded-2xl overflow-hidden glass-panel ${className}`}
      >
        {/* Dynamic cursor follow spotlight glow */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(0, 242, 254, 0.12), transparent 60%)`
          }}
        />
        {children}
      </motion.div>
    </div>
  );
};
