import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const GlowingArrow = () => {
  const glowRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      glowRef.current,
      { y: "-100%" },
      {
        y: "100%",
        duration: 2,
        repeat: -1,
        ease: "power2.inOut",
      }
    );
  }, []);

  return (
    <div className="relative w-16 h-28 mt-10">
      <svg
        viewBox="0 0 100 150"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outline Arrow */}
        <path
          d="M50 10 L50 100 M20 80 L50 140 L80 80"
          stroke="white"
          strokeWidth="6"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Glow Clip Path */}
        <defs>
          <clipPath id="arrow-clip">
            <path d="M50 10 L50 100 M20 80 L50 140 L80 80" />
          </clipPath>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {/* Glowing Beam inside Arrow */}
        <rect
          ref={glowRef}
          x="48"
          width="4"
          height="150"
          fill="white"
          opacity="0.6"
          clipPath="url(#arrow-clip)"
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
};

export default GlowingArrow;
