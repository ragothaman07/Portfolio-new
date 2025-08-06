import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { myProjects } from "./projectData";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import "./Project.css";

const ProjectsSection = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });

  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  const [preview, setPreview] = useState(null);

  const heading = "my Projects";

  // Mirrored animation order
  const getMirroredSequence = (text) => {
    const chars = text.split("");
    const sequence = [];
    let i = 0,
      j = chars.length - 1;
    while (i <= j) {
      if (i === j) {
        sequence.push(i);
      } else {
        sequence.push(i, j);
      }
      i++;
      j--;
    }
    return sequence;
  };

  const charOrder = getMirroredSequence(heading);

  // Scroll trigger
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.6, once: true });

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen py-20 px-5 sm:px-10 lg:px-15 bg-black"
    >
      <motion.h2
      className="text-white text-5xl md:text-6xl font-bold text-center mb-20 flex justify-center flex-wrap plastic-font"

        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {heading.split("").map((char, index) => {
          const delayIndex = charOrder.indexOf(index);
          return (
            <motion.span
              key={index}
              className="inline-block"
              initial={{ opacity: 0, scale: 0.5, y: 20 }} // reversed animation direction
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                delay: delayIndex * 0.05,
                duration: 0.7,
                ease: "easeOut",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </motion.h2>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full mb-10" />

      <div className="max-w-6xl mx-auto">
        {myProjects.map((project) => (
          <React.Fragment key={project.id}>
            <ProjectCard {...project} setPreview={setPreview} />
            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
          </React.Fragment>
        ))}
      </div>

      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-40 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80 border-2 border-white/20"
          src={preview}
          style={{ x: springX, y: springY }}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
