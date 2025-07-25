import React, { useEffect, useRef, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Help from './Help';

gsap.registerPlugin(ScrollTrigger);

const Horizontal2 = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const helpRef = useRef(null);

  useEffect(() => {
    const initAnimations = () => {
      const containerAnim = ScrollTrigger.getById('horizontal-scroll');
      if (!containerRef.current || !containerAnim || !helpRef.current) return false;

      // Clear previous animations
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });

      // Animation for Help component
      gsap.fromTo(helpRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            containerAnimation: containerAnim,
            start: "left center",
            end: "right center",
            scrub: true,
            markers: true // Remove in production
          }
        }
      );

      return true;
    };

    if (!initAnimations()) {
      const interval = setInterval(() => {
        if (initAnimations()) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen relative"
    >
      <Help ref={helpRef} />
    </div>
  );
});

export default Horizontal2;