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
      { icon: '/icons/canva-wordmark-2.svg', label: 'Canva' }, // Invert removed
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
    gsap.killTweensOf(labelRefs.current);
    labelRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { textShadow: '0 0 0px #0ff' },
          {
            textShadow: '0 0 12px #0ff',
            duration: 1.2,
            repeat: 1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.05,
          }
        );
      }
    });
  }, [currentIndex]);

  const current = skillData[currentIndex];
  labelRefs.current = [];

  return (
    <div
      className="w-full h-full p-6 flex flex-col items-center justify-start"
      onMouseEnter={stopRotation}
      onMouseLeave={startRotation}
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-white">
        {current.title}
      </h2>

      <div className="grid grid-cols-3 gap-4 w-full h-full">
        {current.items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center rounded-xl p-4 h-full min-h-[100px] transition-transform hover:scale-110"
          >
            <img
              src={item.icon}
              alt={item.label}
              className={`mb-2 object-contain drop-shadow-lg transition-transform duration-300 ${
                item.label === 'GPTs' || item.label === 'MS Office'
                  ? 'w-24 h-24'
                  : 'w-14 h-14'
              } ${item.invert ? 'filter invert' : ''}`}
              // onError={(e) => {
              //   e.target.onerror = null;
              //   e.target.src = '/icons/default.svg'; // fallback if needed
              // }}
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