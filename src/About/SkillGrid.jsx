import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const skillData = [
  {
    title: 'Java Full Stack',
    items: [
      { icon: '/icons/Java.svg', label: 'Java' },
      { icon: '/icons/Spring.svg', label: 'Spring' },
      { icon: '/icons/React.svg', label: 'React' },
      { icon: '/icons/MongoDB.svg', label: 'MongoDB' },
      { icon: '/icons/MySQL.svg', label: 'SQL' },
      { icon: '/icons/Spring.svg', label: 'Spring Services' },
    ],
  },
  {
    title: 'Helping Libraries and Languages',
    items: [
      { icon: '/icons/Tailwind CSS.svg', label: 'Tailwind' },
      { icon: '/icons/gsap-greensock.svg', label: 'GSAP' },
      { icon: '/icons/Three.js.svg', label: 'R3F', invert: true },
      { icon: '/icons/Node.js.svg', label: 'Node.js' },
      { icon: '/icons/c-1.svg', label: 'C#' },
      { icon: '/icons/Python.svg', label: 'Python' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { icon: '/icons/chatgpt-3.svg', label: 'GPTs', invert: true },
      { icon: '/icons/postman-icon-svgrepo-com.svg', label: 'Postman' },
      { icon: '/icons/canva-wordmark-2.svg', label: 'Canva' },
      { icon: '/icons/office-365-1.svg', label: 'MS Office' },
      { icon: '/icons/GitHub.svg', label: 'Git', invert: true },
      { icon: '/icons/Visual Studio Code (VS Code).svg', label: 'VS Code' },
    ],
  },
  {
    title: 'Personality',
    items: [
      { icon: '/icons/observe-svgrepo-com.svg', label: 'Observer', invert: true },
      { icon: '/icons/learn-svgrepo-com.svg', label: 'Learner', invert: true },
      { icon: '/icons/talking-svgrepo-com.svg', label: 'Communicator', invert: true },
      { icon: '/icons/proud-pose-svgrepo-com.svg', label: 'Optimistic', invert: true },
      { icon: '/icons/idea-svgrepo-com.svg', label: 'Creative', invert: true },
      { icon: '/icons/multi-talented-multitasking-svgrepo-com.svg', label: 'Multi-tasker', invert: true },
    ],
  },
];

const SkillGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const labelRefs = useRef([]);
  const iconRefs = useRef([]);
  const titleRef = useRef(null);

  const startRotation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % skillData.length);
    }, 3000);
  };

  const stopRotation = () => clearInterval(intervalRef.current);

  useEffect(() => {
    startRotation();
    return () => stopRotation();
  }, []);

  useEffect(() => {
    // Kill any existing animations
    gsap.killTweensOf(labelRefs.current);
    gsap.killTweensOf(iconRefs.current);
    gsap.killTweensOf(titleRef.current);

    // Title animation sequence (right to center to left)
    const titleAnimation = gsap.timeline();
    titleAnimation
      .fromTo(
        titleRef.current,
        { x: 200, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.5, 
          ease: 'power2.out'
        }
      )
      .to(
        titleRef.current,
        {
          x: -200,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
          delay: 2 // Pause in center for 2 seconds
        }
      );

    // Icon pop-in animation
    gsap.fromTo(
      iconRefs.current,
      { 
        scale: 0,
        opacity: 0
      },
      { 
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }
    );

    // Label pop-in animation
    labelRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { 
            y: 10,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.05,
            ease: 'back.out(1.5)'
          }
        );
      }
    });

  }, [currentIndex]);

  const current = skillData[currentIndex];
  labelRefs.current = [];
  iconRefs.current = [];

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-start"
      onMouseEnter={stopRotation}
      onMouseLeave={startRotation}
    >
      <div className="overflow-hidden h-12 mb-4 w-full">
        <h2 
          ref={titleRef}
          className="text-3xl font-bold text-center text-white w-full"
        >
          {current.title}
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full h-full">
        {current.items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-2"
          >
            <img
              ref={el => iconRefs.current[idx] = el}
              src={item.icon}
              alt={item.label}
              className={`mb-2 object-contain ${
                item.label === 'GPTs' || item.label === 'MS Office'
                  ? 'w-24 h-24'
                  : 'w-14 h-14'
              } ${item.invert ? 'filter invert' : ''}`}
            />
            <span
              ref={(el) => (labelRefs.current[idx] = el)}
              className="text-base font-semibold text-white text-center"
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillGrid;