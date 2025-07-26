import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Scene from '../Circular/Scene';
import SkillGrid from './SkillGrid';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const horizontalRef = useRef(null);
  const panel1Ref = useRef(null);
  const panel2Ref = useRef(null);
  const panel3Ref = useRef(null);
  const headingRef = useRef(null);
  const aboutTextRef = useRef(null);
  const hasTyped = useRef(false);
  const boxRef = useRef(null); // New ref for the moving box

  const aboutText = 'Lorem ipsum dolor sit amet';

  useEffect(() => {
    const panels = [panel1Ref.current, panel2Ref.current, panel3Ref.current];
    const container = horizontalRef.current;

    if (!container || panels.some(panel => !panel)) return;

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Horizontal scroll setup
    const scrollTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        id: 'horizontal-scroll',
        trigger: container,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: { min: 0.1, max: 0.3 },
          ease: 'power1.inOut',
        },
        start: 'top top',
        end: () => `+=${container.offsetWidth * (panels.length - 1)}`,
        markers: false,
      },
    });

    // Panel 1 animations
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
            trigger: panel1Ref.current,
            start: 'left center',
            end: 'center center',
            scrub: true,
          }
        }
      );
    }

    if (aboutTextRef.current && !hasTyped.current) {
      ScrollTrigger.create({
        trigger: panel1Ref.current,
        start: 'left 70%',
        end: 'center 30%',
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
          }, 30);
        },
      });
    }

    // Panel 2 animation - Simple box movement
   if (panel2Ref.current && boxRef.current) {
  gsap.fromTo(
    boxRef.current,
    { x: -1000, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: panel2Ref.current,
        containerAnimation: scrollTween, // ✅ Link to horizontal scroll
        start: "left center",
        toggleActions: "play none none none",
        once: true,
      }
    }
  );
}

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
          {/* Panel 1 */}
          <div ref={panel1Ref} className="w-screen h-full flex">
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

          {/* Panel 2 - Simple moving box */}
          <div ref={panel2Ref} className="w-screen h-full relative flex items-center justify-center bg-gray-900">
            <div 
              ref={boxRef}
              className="w-32 h-32 bg-cyan-500 rounded-lg flex items-center justify-center shadow-xl"
            >
              <span className="text-white font-bold">Hello!</span>
            </div>
          </div>

          {/* Panel 3 */}
          <div ref={panel3Ref} className="w-screen h-full flex items-center justify-center bg-gray-800">
            <h1 className="text-4xl font-bold">Panel 3 Content</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;