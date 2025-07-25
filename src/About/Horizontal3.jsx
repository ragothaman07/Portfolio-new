// Horizontal1.jsx
import React, { useEffect, useRef } from 'react';
import Scene from '../Circular/Scene';
import SkillGrid from './SkillGrid';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Horizontal1 = React.forwardRef((_, ref) => {
  const aboutTextRef = useRef(null);
  const headingRef = useRef(null);
  const hasTyped = useRef(false);

  const aboutText = "lorem";

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { x: 400, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 60%',
          },
        }
      );
    }

    if (aboutTextRef.current && !hasTyped.current) {
      ScrollTrigger.create({
        trigger: aboutTextRef.current,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          hasTyped.current = true;
          let index = 0;
          aboutTextRef.current.textContent = '';
          const interval = setInterval(() => {
            if (index < aboutText.length) {
              aboutTextRef.current.textContent += aboutText[index];
              index++;
            } else {
              clearInterval(interval);
            }
          }, 25);
        },
      });
    }
  }, []);

  return (
    <div ref={ref} className="w-screen h-full flex">
      <div className="w-1/4 flex items-center justify-center bg-gray-900">
        <div className="w-40 h-40 bg-gray-700 rounded-lg flex items-center justify-center">
          <span className="text-sm text-gray-300">3D Model</span>
        </div>
      </div>

      <div className="w-3/4 flex flex-col">
        <div className="h-1/2 bg-gray-800 rounded-lg p-6 m-4 overflow-hidden">
          <h1
            ref={headingRef}
            className="text-6xl font-bold mb-4 afonturalyess-font"
          >
            About Me
          </h1>
          <p
            ref={aboutTextRef}
            className="youth-touch-font text-xl whitespace-pre-line break-words overflow-hidden"
          ></p>
        </div>

        <div className="h-1/2 flex gap-4 px-4 pb-4">
          <div className="w-1/2 bg-gray-700 rounded-lg p-2">
            <Scene />
          </div>
          <div className="w-1/2">
            <SkillGrid />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Horizontal1;
