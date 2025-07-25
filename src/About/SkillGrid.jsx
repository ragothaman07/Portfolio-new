import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const skillData = [
  {
    title: 'Java Full Stack',
    items: [
      { icon: '/icons/java.svg', label: 'Java' },
      { icon: '/icons/spring.svg', label: 'Spring' },
      { icon: '/icons/react.svg', label: 'React' },
      { icon: '/icons/mongodb.svg', label: 'MongoDB' },
      { icon: '/icons/sql.svg', label: 'SQL' },
      { icon: '/icons/api.svg', label: 'Spring Services' },
    ],
  },
  {
    title: 'Helping Libraries',
    items: [
      { icon: '/icons/tailwind.svg', label: 'Tailwind' },
      { icon: '/icons/gsap.svg', label: 'GSAP' },
      { icon: '/icons/r3f.svg', label: 'R3F' },
      { icon: '/icons/node.svg', label: 'Node.js' },
      { icon: '/icons/axios.svg', label: 'Axios' },
      { icon: '/icons/zustand.svg', label: 'Zustand' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { icon: '/icons/gpt.svg', label: 'GPTs' },
      { icon: '/icons/postman.svg', label: 'Postman' },
      { icon: '/icons/canva.svg', label: 'Canva' },
      { icon: '/icons/ms-office.svg', label: 'MS Office' },
      { icon: '/icons/git.svg', label: 'Git' },
      { icon: '/icons/vscode.svg', label: 'VS Code' },
    ],
  },
  {
    title: 'Personality',
    items: [
      { icon: '/icons/observer.svg', label: 'Observer' },
      { icon: '/icons/learner.svg', label: 'Learner' },
      { icon: '/icons/talk.svg', label: 'Communicator' },
      { icon: '/icons/optimistic.svg', label: 'Optimistic' },
      { icon: '/icons/creative.svg', label: 'Creative' },
      { icon: '/icons/multitask.svg', label: 'Multi-tasker' },
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

  // 🔧 Clear refs before rendering
  labelRefs.current = [];

  return (
    <div
      className="w-full h-full bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-start"
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
            className="flex flex-col items-center justify-center bg-gray-700 rounded-xl p-4 h-full min-h-[100px] transition hover:scale-105"
          >
            <img
              src={item.icon}
              alt={item.label}
              className="w-14 h-14 mb-2 object-contain"
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
