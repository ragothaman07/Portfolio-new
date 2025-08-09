// src/About/RotatingText.jsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';


export default function RotatingText({
  words = [
    'Engineer',
    'Developer',
    'Problem Solver',
    'Genius',
    'God',
    'Ragothaman T V',
  ],
  intervalMs = 2000,
}) {
  const [index, setIndex] = useState(0);
  const wordRef = useRef(null);
  const intervalRef = useRef(null);
  const tweenRef = useRef(null);

  // initial set + start interval
  useEffect(() => {
    if (wordRef.current) gsap.set(wordRef.current, { yPercent: 100, opacity: 0 });

    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);

    return () => {
      clearInterval(intervalRef.current);
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [intervalMs, words.length]);

  // animate in each word
  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;

    if (tweenRef.current) tweenRef.current.kill();
    gsap.set(el, { yPercent: 100, opacity: 0 });
    tweenRef.current = gsap.to(el, {
      yPercent: 0,
      opacity: 1,
      duration: 0.45,
      ease: 'power3.out',
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [index]);

 return (
  <div className="mt-4 flex items-center gap-4">
    <motion.span
      className="text-3xl font-bold lowercase"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      aria-hidden
    >
      <p className='text-5xl'>-im</p>
    </motion.span>
<div className="relative overflow-hidden h-[2.5rem] w-[16rem] flex items-center justify-start">
  <AnimatePresence mode="wait">
    <motion.span
      key={words[index]}
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: '0%', opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="text-3xl font-semibold absolute whitespace-nowrap"
      aria-live="polite"
      role="status"
    >
      {words[index]}
    </motion.span>
  </AnimatePresence>
</div>



  </div>
);
}
