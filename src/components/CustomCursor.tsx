import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isPointer, setIsPointer] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor trailing
  const springX = useSpring(mouseX, { stiffness: 450, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28 });

  const dotSpringX = useSpring(mouseX, { stiffness: 800, damping: 35 });
  const dotSpringY = useSpring(mouseY, { stiffness: 800, damping: 35 });

  useEffect(() => {
    // Check if device supports fine hover
    const checkTouch = () => {
      const hasTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsTouchDevice(hasTouch || prefersReducedMotion);
      if (!hasTouch && !prefersReducedMotion) {
        document.body.classList.add('has-custom-cursor');
      } else {
        document.body.classList.remove('has-custom-cursor');
      }
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, textarea, select, [role="button"]');
      setIsPointer(!!interactive);

      const customLabel = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (customLabel) {
        setCursorText(customLabel);
      } else if (interactive) {
        setCursorText('');
      } else {
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [isVisible, isTouchDevice, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full mix-blend-difference border border-cyan-300/80 bg-cyan-400/10 backdrop-blur-[1px]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorText ? 64 : isPointer ? 44 : 28,
          height: cursorText ? 64 : isPointer ? 44 : 28,
          transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono tracking-widest text-cyan-200 font-bold uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Precision Dot */}
      {!cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]"
          style={{
            x: dotSpringX,
            y: dotSpringY,
            translateX: '-50%',
            translateY: '-50%',
            width: isPointer ? 6 : 4,
            height: isPointer ? 6 : 4,
            transition: 'width 0.15s, height 0.15s'
          }}
        />
      )}
    </>
  );
};
