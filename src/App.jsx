import React, { useEffect } from "react";
import Hero from "./Hero/Hero";
import About from "./About/About";
import ProjectsSection from "./Project/ProjectsSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Contact from "./Contact/Contact";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  return (
    <>
      {/* Fixed hero layer */}
      <div className="fixed top-0 left-0 w-full h-full z-10">
        <Hero />
      </div>
      
      {/* Scrollable content layer */}
      <div className="relative z-20" style={{ marginTop: '100vh' }}>
        <About />
      </div>
      <div className="relative z-20 bg-black">
        <ProjectsSection />
      </div>
      <div className="relative z-20 bg-black">
        <Contact />
      </div>
    </>
  );
};
export default App;