import React, { useEffect, useRef } from 'react';
import Horizontal1 from './Horizontal1';
import Horizontal2 from './Horizontal2';
import Horizontal3 from './Horizontal3';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const horizontalRef = useRef(null);
  const panel1Ref = useRef(null);
  const panel2Ref = useRef(null);
  const panel3Ref = useRef(null);

  useEffect(() => {
    const panels = [panel1Ref.current, panel2Ref.current, panel3Ref.current];
    const container = horizontalRef.current;

    if (!container || panels.some(panel => !panel)) return;

    // Clear existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const scrollTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        id: 'horizontal-scroll', // Important for child components
        trigger: container,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: { min: 0.1, max: 0.3 },
          ease: 'power1.inOut'
        },
        start: 'top top',
        end: () => `+=${container.offsetWidth * (panels.length - 1)}`,
        markers: true // Keep for debugging
      }
    });

    // Force refresh after a small delay
    setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="bg-black text-white w-full overflow-hidden">
      <div
        ref={horizontalRef}
        className="relative w-screen h-screen overflow-hidden"
      >
        <div className="flex w-[300vw] h-full">
          <div ref={panel1Ref} className="w-screen h-full">
            <Horizontal1 />
          </div>
          <div ref={panel2Ref} className="w-screen h-full">
            <Horizontal2 />
          </div>
          <div ref={panel3Ref} className="w-screen h-full">
            <Horizontal3 />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;