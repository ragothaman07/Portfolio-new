import React, { useEffect } from "react";
import Hero from "./Hero/Hero";
import About from "./About/About";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

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
    </>
  );
};
export default App;
