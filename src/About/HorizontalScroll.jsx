// HorizontalScroll.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './HorizontalScroll.css';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const panels = panelsRef.current;

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => '+=' + containerRef.current.offsetWidth,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="horizontal-section w-screen h-screen overflow-hidden relative bg-black text-white"
    >
      <div className="flex w-[300vw] h-full">
        {[1, 2, 3].map((num, index) => (
          <div
            key={index}
            ref={(el) => (panelsRef.current[index] = el)}
            className="w-screen h-full flex items-center justify-center bg-gray-800 text-4xl font-bold"
          >
            Panel {num}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScroll;
