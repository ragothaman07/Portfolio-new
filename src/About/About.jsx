import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SkillGrid from './SkillGrid';
import './About.css';
import { motion } from 'framer-motion'; 
import Scene from '../Circular/scene';
import Card3D from './Card3D';
import RotatingText from './RotatingText';
import ModelViewer from './ModelViewer';
import HobbyDisplay from "./HobbyDisplay";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const horizontalRef = useRef(null);
  const panel1Ref = useRef(null);
  const panel2Ref = useRef(null);
  const panel3Ref = useRef(null);
  const headingRef = useRef(null);
  const aboutTextRef = useRef(null);
  const panel2HeadingRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const hasTyped = useRef(false);
  const footerTextRef = useRef(null); 
  const workBoxesRef = useRef([]);

  // ✅ State for hobbies
  const [hoveredHobby, setHoveredHobby] = useState(null);

  const titleText = 'Journey of my Knowledge';
  const aboutText =
    "I'm Ragothmana T.V, a Java Full Stack Developer with a B.E. in Computer Science and Engineering. I have a strong grasp of core computer science fundamentals such as DBMS, Networking, and Object-Oriented Programming. I've completed several hands-on projects in Java and web development, gaining experience across both frontend and backend. I enjoy solving complex problems and writing clean, efficient code. With solid communication and interpersonal skills, I work well in teams and adapt quickly to new challenges";

  const educationData = [
    {
      wrapperClass: 'card-item-1',
      title: 'Bhaktavatsalam Vidyashram',
      specialization: 'General Stream',
      marks: '66.8%',
      year: '2015',
      smallInfo: ['10'],
      styleOverride: { position: 'relative', top: '-4vh' },
      backContent: 'Studied core subjects, participated in science club and football team.',
    },
    {
      wrapperClass: 'card-item-2',
      title: 'Bhaktavatsalam Vidyashram',
      specialization: 'Computer Science',
      marks: '73%',
      year: '2017',
      smallInfo: ['12'],
      styleOverride: { position: 'relative', top: '4vh' },
      backContent: 'Focused on programming basics, started learning Java & HTML/CSS.',
    },
    {
      wrapperClass: 'card-item-3',
      title: 'S.A. Engineering College',
      specialization: 'Computer Science Engineering',
      marks: '7.9 CGPA',
      year: '2021',
      smallInfo: ['CSE'],
      styleOverride: { position: 'relative', top: '-4vh' },
      backContent: 'Completed projects in Java & web dev. Interned at XYZ company — worked on REST APIs.',
    },
    {
      wrapperClass: 'card-item-4',
      title: 'Current Status',
      specialization: 'Learning New Tech & Improving Daily',
      marks: '∞',
      year: '2025',
      smallInfo: ['Jobless'],
      styleOverride: { position: 'relative', top: '4vh' },
      backContent: 'Exploring cloud-native tooling, doing personal projects, and interviewing.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = [panel1Ref.current, panel2Ref.current, panel3Ref.current];
      const container = horizontalRef.current;
      if (!container || panels.some((p) => !p)) return;

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

      gsap.set(headingRef.current, { x: -200, opacity: 0 });
      gsap.set(aboutTextRef.current, { opacity: 0 });

      ScrollTrigger.create({
        trigger: panel1Ref.current,
        containerAnimation: scrollTween,
        start: 'left 70%',
        end: 'left 30%',
        onEnter: () => {
          gsap.to(headingRef.current, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' });
          if (!hasTyped.current) {
            hasTyped.current = true;
            let index = 0;
            aboutTextRef.current.textContent = '';
            gsap.to(aboutTextRef.current, { opacity: 1, duration: 0.3 });
            const interval = setInterval(() => {
              if (index < aboutText.length) aboutTextRef.current.textContent += aboutText[index++];
              else clearInterval(interval);
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

      gsap.set(panel2HeadingRef.current, {
        rotationX: -180,
        opacity: 0,
        transformPerspective: 900,
        transformOrigin: '50% 50%',
      });

      const recomputeSvgForHeading = () => {
        const headingEl = panel2HeadingRef.current;
        const svgEl = svgRef.current;
        const pathEl = pathRef.current;
        if (!headingEl || !svgEl || !pathEl) return null;

        const headingWidthPx = Math.round(headingEl.getBoundingClientRect().width);
        svgEl.setAttribute('width', headingWidthPx);
        svgEl.setAttribute('height', 12);
        svgEl.setAttribute('viewBox', `0 0 ${headingWidthPx} 10`);

        const d = `M0 5 L ${headingWidthPx} 5`;
        pathEl.setAttribute('d', d);

        let length = 0;
        try {
          length = pathEl.getTotalLength();
        } catch (err) {
          console.warn('getTotalLength failed', err);
        }

        pathEl.style.strokeDasharray = length;
        pathEl.style.strokeDashoffset = length;
        return length;
      };

      let pathLength = recomputeSvgForHeading();
      const onResize = () => {
        pathLength = recomputeSvgForHeading();
      };
      window.addEventListener('resize', onResize);

      ScrollTrigger.create({
        trigger: panel2Ref.current,
        containerAnimation: scrollTween,
        start: 'left 30%',
        end: 'left 30%',
        onEnter: () => {
          gsap.to(panel2HeadingRef.current, {
            rotationX: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            transformOrigin: '50% 50%',
          });
        },
        onLeaveBack: () => {
          gsap.to(panel2HeadingRef.current, {
            rotationX: 180,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.in',
            transformOrigin: '50% 50%',
          });
        },
      });

      if (pathRef.current && pathLength > 0) {
        ScrollTrigger.create({
          trigger: panel2Ref.current,
          containerAnimation: scrollTween,
          start: 'left 30%',
          end: 'left 0%',
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const offset = Math.max(0, pathLength * (1 - p));
            if (pathRef.current) pathRef.current.style.strokeDashoffset = offset;
          },
        });
      }

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
          onEnter: () =>
            gsap.to(el, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'back.out(1.1)',
            }),
          onLeave: () =>
            gsap.to(el, {
              opacity: 0,
              y: from,
              scale: 0.95,
              duration: 0.5,
              ease: 'power2.inOut',
            }),
          onEnterBack: () =>
            gsap.to(el, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'back.out(1.1)',
            }),
          onLeaveBack: () =>
            gsap.to(el, {
              opacity: 0,
              y: from,
              scale: 0.95,
              duration: 0.5,
              ease: 'power2.inOut',
            }),
        });
      });

      gsap.set(workBoxesRef.current, { scale: 0, opacity: 0, transformOrigin: "center" });

      workBoxesRef.current.forEach((box) => {
        if (!box) return;
        ScrollTrigger.create({
          trigger: box,
          containerAnimation: scrollTween,
          start: "top 70%",
          once: true,
          onEnter: () => {
            gsap.to(box, {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(1.2)"
            });
          }
        });
      });

      const setupFooterAnimation = () => {
        const el = footerTextRef.current;
        if (!el) return;

        el.innerHTML += el.innerHTML;
        const totalWidth = el.scrollWidth / 2;

        const tween = gsap.to(el, {
          x: `-=${totalWidth}`,
          duration: 8,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
          }
        });

        tween.timeScale(1);

        window.addEventListener("wheel", (e) => {
          if (e.deltaY > 0) {
            tween.timeScale(1);
          } else {
            tween.timeScale(-1);
          }
        });
      };

      setupFooterAnimation();

      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener('resize', onResize);
        gsap.killTweensOf(footerTextRef.current);
      };
    }, horizontalRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="text-white w-full overflow-hidden">
      <div ref={horizontalRef} className="relative w-screen h-screen overflow-hidden bg-white">
        <div className="flex min-w-[300vw] w-fit h-full relative z-[3]">
          
          {/* Panel 1 */}
          <div ref={panel1Ref} className="min-w-[100vw] w-full h-full flex">
            <div className="w-1/4 h-full flex items-center justify-center py-4">
              <div className="flex flex-col w-full h-full px-4 py-2 border-2 border-black rounded-3xl bg-black
              ">
                <ModelViewer/>
              </div>
            </div>

            <div className="w-3/4 flex flex-col">
              <div className="h-1/2 rounded-3xl p-6 m-4 bg-black
               overflow-hidden">
                <div className='flex '>
                  <h1 ref={headingRef} className="text-6xl font-bold mb-4 plastic-font text-white">
                  who am I? 
                 
                </h1>
                 <div className='pl-8'>
                     <RotatingText/>
                  </div>
            
                </div>
                <p ref={aboutTextRef} className="Vergilia-font text-3xl whitespace-pre-line text-white" />
              </div>
             <div className="h-1/2 flex gap-4 px-4 pb-4">
  <div className="w-1/2 rounded-3xl p-2 bg-black">
    <Scene />
  </div>
  <div className="w-1/2 rounded-3xl bg-black flex flex-col items-center justify-center">
    <h1 className="text-3xl mb-4 mt-8">Skill</h1>
    <SkillGrid />
  </div>
</div>

            </div>
          </div>
    
          {/* Panel 2 */}
          <div ref={panel2Ref} className="min-w-[100vw] w-full h-full relative bg-black overflow-hidden">
            <div className="w-full h-full relative z-40 flex flex-col items-center">
              <h2
                ref={panel2HeadingRef}
                className="panel2-flip-heading text-center text-white text-7xl font-bold mt-8 mb-2 soda-shake-font"
              >
                {titleText}
              </h2>

              <svg
                ref={svgRef}
                className="panel2-underline-svg"
                height="12"
                viewBox="0 0 100 10"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  ref={pathRef}
                  d="M0 5 L100 5"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <div className="flex-1 flex items-center justify-center gap-[4vw]">
  {educationData.map((edu, idx) => (
    <div key={idx} className={edu.wrapperClass} style={edu.styleOverride}>
      <Card3D {...edu} />
    </div>
  ))}
</div>
            </div>
          </div>

          {/* Panel 3 */}
          <div ref={panel3Ref} className="min-w-[100vw] w-full h-full bg-white text-black flex flex-col pr-8">
            <div className="h-[10%] bg-gray-300 m-2 rounded-xl flex items-center justify-center">
              <h1 className="panel3-heading" data-text="Iam">
                <span className="actual-text">&nbsp;Ragothaman&nbsp;</span>
                <span aria-hidden="true" className="hover-text">&nbsp;Ragothaman&nbsp;</span>
              </h1>
            </div>

            <div className="h-[80%] flex">
              <div className="w-[70%] bg-gray-100 m-2 rounded-xl p-4">
                <h3 className="text-2xl font-semibold mb-4">Work Timeline</h3>
                <div className="flex w-full h-[calc(100%-2rem)] gap-4">
                  
                  {/* Left Column */}
                  <div className="w-1/2 flex flex-col gap-4 ">
                    <div
                      className="h-1/2 rounded-xl shadow flex items-center justify-start p-4"
                      ref={(el) => (workBoxesRef.current[0] = el)}
                      style={{ background: 'linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)' }}
                    >
                      <span className="stroke-text text-9xl">Instagram Work</span>
                    </div>

                    <div
                      className="h-1/2 rounded-xl shadow bg-black flex items-center justify-start p-4"
                      ref={(el) => (workBoxesRef.current[1] = el)}
                    >
                      <span className="stroke-text text-9xl">Loading</span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="w-1/2 flex flex-col gap-4 ">
                    <div
                      className="h-1/2 rounded-xl shadow bg-[#FF0000] flex items-center justify-start p-4"
                      ref={(el) => (workBoxesRef.current[2] = el)}
                    >
                      <span className="stroke-text text-9xl">YouTube Work</span>
                    </div>

                    <div
                      className="h-1/2 rounded-xl shadow bg-black flex items-center justify-start p-4"
                      ref={(el) => (workBoxesRef.current[3] = el)}
                    >
                      <span className="stroke-text text-9xl">Loading</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[30%] flex flex-col gap-2 m-2"> 
                <div className="flex-1 rounded-xl p-3 d1-container ">
                  <div className='flex items-center'>
                    <h1 className="d1-heading" data-text="Hobbys & Interests">
                      <span className="actual-text">&nbsp;Hobbys & Interests&nbsp;</span>
                      <span aria-hidden="true" className="hover-text">&nbsp;Hobbys & Interests&nbsp;</span>
                    </h1>
                  </div>
                  <div className="d1-cards">
                    <div 
                      className="d1-card"
                      onMouseEnter={() => setHoveredHobby("Drawing")}
                      onMouseLeave={() => setHoveredHobby(null)}
                    >
                      <p className="d1-tip">Drawing</p>
                    </div>
                    <div 
                      className="d1-card"
                      onMouseEnter={() => setHoveredHobby("Photography")}
                      onMouseLeave={() => setHoveredHobby(null)}
                    >
                      <p className="d1-tip">Photography</p>
                    </div>
                    <div 
                      className="d1-card"
                      onMouseEnter={() => setHoveredHobby("Anime")}
                      onMouseLeave={() => setHoveredHobby(null)}
                    >
                      <p className="d1-tip">Anime</p>
                    </div>
                  </div>
                </div>

<div
  className="bg-black rounded-xl p-4 flex items-center justify-center w-full h-full"
>
  <HobbyDisplay hoveredHobby={hoveredHobby} width={600} height={480} />
</div>

              </div>
            </div>

            <div className="relative mt-auto h-[10%] rounded-xl overflow-hidden">
              <div 
                className="absolute w-fit whitespace-nowrap flex items-center h-full" 
                ref={footerTextRef}
              >
                <div id='move' className='bg-black text-white flex items-center p-4'>
                  <div className='marquee text-3xl'><h1>Ragothaman the great |</h1></div>
                  <div className='marquee text-3xl'><h1>Ragothaman the great |</h1></div>
                  <div className='marquee text-3xl'><h1>Ragothaman the great |</h1></div>
                  <div className='marquee text-3xl'><h1>Ragothaman the great |</h1></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
