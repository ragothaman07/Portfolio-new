import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SkillGrid from './SkillGrid';
import './About.css';
import Scene from '../Circular/scene';
import Card3D from './Card3D';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const horizontalRef = useRef(null);
  const panel1Ref = useRef(null);
  const panel2Ref = useRef(null);
  const panel3Ref = useRef(null);
  const headingRef = useRef(null);
  const aboutTextRef = useRef(null);
  const panel2TitleRef = useRef(null);
  const hasTyped = useRef(false);

  const titleText = 'Journey of my Knowledge';
  const aboutText =
    "I’m Ragothmana T.V, a Java Full Stack Developer with a B.E. in Computer Science and Engineering. I have a strong grasp of core computer science fundamentals such as DBMS, Networking, and Object-Oriented Programming. I’ve completed several hands-on projects in Java and web development, gaining experience across both frontend and backend. I enjoy solving complex problems and writing clean, efficient code. With solid communication and interpersonal skills, I work well in teams and adapt quickly to new challenges";

  const educationData = [
    {
      wrapperClass: 'card-item-1',
      title: 'Bhaktavatsalam Vidyashram',
      specialization: 'General Stream',
      marks: '66.8%',
      year: '2015',
      smallInfo: ['10'],
      styleOverride: { position: 'relative', top: '-4vh' },
    },
    {
      wrapperClass: 'card-item-2',
      title: 'Bhaktavatsalam Vidyashram',
      specialization: 'Computer Science',
      marks: '73%',
      year: '2017',
      smallInfo: ['12'],
      styleOverride: { position: 'relative', top: '4vh' },
    },
    {
      wrapperClass: 'card-item-3',
      title: 'S.A. Engineering College',
      specialization: 'Computer Science Engineering',
      marks: '7.9 CGPA',
      year: '2021',
      smallInfo: ['CSE'],
      styleOverride: { position: 'relative', top: '-4vh' },
    },
    {
      wrapperClass: 'card-item-4',
      title: 'Current Status',
      specialization: 'Learning New Tech & Improving Daily',
      marks: '∞',
      year: '2025',
      smallInfo: ['Jobless'],
      styleOverride: { position: 'relative', top: '4vh' },
    },
  ];

  useEffect(() => {
    const panels = [panel1Ref.current, panel2Ref.current, panel3Ref.current];
    const container = horizontalRef.current;
    if (!container || panels.some((panel) => !panel)) return;

    // kill existing triggers (hot reload safe)
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const scrollTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => '+=' + window.innerWidth * (panels.length + 1),
      },
    });

    // Panel 1 heading/typing (unchanged)
    gsap.set(headingRef.current, { x: -200, opacity: 0 });
    gsap.set(aboutTextRef.current, { opacity: 0 });

    ScrollTrigger.create({
      trigger: panel1Ref.current,
      containerAnimation: scrollTween,
      start: 'left 70%',
      end: 'left 30%',
      onEnter: () => {
        gsap.to(headingRef.current, {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        });

        if (!hasTyped.current) {
          hasTyped.current = true;
          let index = 0;
          aboutTextRef.current.textContent = '';
          gsap.to(aboutTextRef.current, { opacity: 1, duration: 0.3 });

          const interval = setInterval(() => {
            if (index < aboutText.length) {
              aboutTextRef.current.textContent += aboutText[index++];
            } else {
              clearInterval(interval);
            }
          }, 24);
        }
      },
      onLeaveBack: () => {
        gsap.to(headingRef.current, { x: 200, opacity: 0, duration: 1 });
        aboutTextRef.current.textContent = '';
        gsap.to(aboutTextRef.current, { opacity: 0, duration: 0.3 });
        hasTyped.current = false;
      },
    });

    // -------------------------
    // Panel 2 per-letter animation with bump effect
    // -------------------------
    if (panel2TitleRef.current && panel2Ref.current) {
      const chars = panel2TitleRef.current.querySelectorAll('.char');
      if (chars.length) {
        // compute start X from panel width so letters come from panel end
        const panelWidth = panel2Ref.current.offsetWidth || window.innerWidth;
        const startXBase = Math.round(panelWidth * 0.6) + 200; // tweak multiplier to adjust distance

        // start state
        gsap.set(chars, { x: startXBase, opacity: 0 });

        // timeline for entrance: slide from right to slight overshoot (-12), then bump to 0
        const tl = gsap.timeline({ paused: true });

        // Step 1: main slide in to slight overshoot (-12). Stagger from last char so they arrive one after another from end
        tl.to(chars, {
          x: -12,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.in', // accelerating feel
          stagger: { each: 0.06, from: 'end' }, // one after another, last letter first
        });

        // Step 2: small bump into final position (0) using back.out for bounce. Stagger same direction and timing so letters "land" with a bounce.
        tl.to(
          chars,
          {
            x: 0,
            duration: 0.28,
            ease: 'back.out(1.6)', // bump/bounce effect
            stagger: { each: 0.06, from: 'end' },
          },
          '>-0.12' // overlap slightly so it feels snappy
        );

        // Create ScrollTrigger to play/reverse this timeline with the horizontal scrollTween
        const titleTrigger = ScrollTrigger.create({
          trigger: panel2Ref.current,
          containerAnimation: scrollTween,
          start: 'left center',
          end: 'left 20%',
          onEnter: () => {
            tl.play(0);
          },
          onLeaveBack: () => {
            // reverse with small stagger to send letters back cleanly
            tl.reverse();
          },
        });

        // cleanup
        ScrollTrigger.addEventListener('kill', () => {
          titleTrigger && titleTrigger.kill && titleTrigger.kill();
          tl && tl.kill && tl.kill();
        });
      }
    }

    // Card animations (unchanged)
    const cardConfig = [
      { sel: '.card-item-1', from: '-100vh' },
      { sel: '.card-item-2', from: '100vh' },
      { sel: '.card-item-3', from: '-100vh' },
      { sel: '.card-item-4', from: '100vh' },
    ];

    cardConfig.forEach(({ sel, from }) => {
      const el = container.querySelector(sel);
      if (!el) return;

      gsap.set(el, { opacity: 0, y: from, scale: 0.95 });

      ScrollTrigger.create({
        trigger: el,
        containerAnimation: scrollTween,
        start: 'right 100%',
        end: 'right 20%',
        toggleActions: 'play reverse play reverse',
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.1)',
          });
        },
        onLeave: () => {
          gsap.to(el, {
            opacity: 0,
            y: from,
            scale: 0.95,
            duration: 0.5,
            ease: 'power2.inOut',
          });
        },
        onEnterBack: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.1)',
          });
        },
        onLeaveBack: () => {
          gsap.to(el, {
            opacity: 0,
            y: from,
            scale: 0.95,
            duration: 0.5,
            ease: 'power2.inOut',
          });
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="text-white w-full overflow-hidden">
      <div ref={horizontalRef} className="relative w-screen h-screen overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-[100vw] top-0 w-[200vw] h-full object-cover z-[1]"
        >
          <source src="/video/bg-video3.mp4" type="video/mp4" />
        </video>

        <div className="panel-gradient-overlay absolute left-[100vw] top-0 w-[200vw] h-full z-[2]" />

        <div className="flex min-w-[300vw] w-fit h-full relative z-[3]">
          {/* Panel 1 */}
          <div ref={panel1Ref} className="min-w-[100vw] w-full h-full flex">
            <div className="w-1/4 h-full flex items-center justify-center py-4">
              <div className="flex flex-col w-full h-full px-4 py-2 border-2 border-black rounded-3xl bg-gray-800" />
            </div>

            <div className="w-3/4 flex flex-col">
              <div className="h-1/2 rounded-3xl p-6 m-4 bg-gray-800 overflow-hidden">
                <h1 ref={headingRef} className="text-6xl font-bold mb-4 plastic-font text-white">
                  About me
                </h1>
                <p
                  ref={aboutTextRef}
                  className="Vergilia-font text-3xl whitespace-pre-line text-white"
                />
              </div>
              <div className="h-1/2 flex gap-4 px-4 pb-4">
                <div className="w-1/2 rounded-3xl p-2 bg-gray-800">
                  <Scene />
                </div>
                <div className="w-1/2 rounded-3xl bg-gray-800">
                  <SkillGrid />
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div
            ref={panel2Ref}
            className="min-w-[100vw] w-full h-full relative bg-black overflow-hidden"
          >
            <div className="w-full h-full relative z-40 flex flex-col items-center">
              {/* Title split into chars */}
              <h2
                ref={panel2TitleRef}
                className="text-center text-white text-7xl font-bold mt-8 mb-6 soda-shake-font"
                aria-label={titleText}
              >
                {titleText.split('').map((ch, i) => {
                  if (ch === ' ') {
                    return (
                      <span
                        key={`sp-${i}`}
                        className="char space inline-block"
                        style={{ width: '0.45em' }}
                      >
                        &nbsp;
                      </span>
                    );
                  }
                  return (
                    <span key={`${ch}-${i}`} className="char inline-block">
                      {ch}
                    </span>
                  );
                })}
              </h2>

              {/* Cards row */}
              <div className="flex-1 flex items-center justify-center gap-[4vw]">
                {educationData.map((edu, idx) => (
                  <Card3D key={idx} {...edu} />
                ))}
              </div>
            </div>
          </div>

          {/* Panel 3 */}
          <div
            ref={panel3Ref}
            className="min-w-[100vw] w-full h-full flex items-center justify-center bg-gray-700"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
