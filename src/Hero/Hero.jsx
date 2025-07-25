import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "/src/assets/img/hero-final.png";
import spinnerImage from "/src/assets/img/spin.png";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const nameRef = useRef();
  const spinnerRef = useRef();
  const innerImageRef = useRef();

  useEffect(() => {
    // Create smooth-content element if it doesn't exist
    if (!document.getElementById('smooth-content')) {
      const div = document.createElement('div');
      div.id = 'smooth-content';
      document.body.appendChild(div);
    }

    // Existing animations
    const element = nameRef.current;
    requestAnimationFrame(() => {
      const screenWidth = window.innerWidth;
      const textWidth = element.getBoundingClientRect().width;

      gsap.fromTo(
        element,
        { x: screenWidth },
        {
          x: -textWidth,
          duration: 4,
          ease: "linear",
          repeat: -1,
        }
      );
    });

    gsap.to(spinnerRef.current, {
      rotation: 360,
      repeat: -1,
      ease: "linear",
      duration: 4,
    });

    gsap.to(innerImageRef.current, {
      rotation: -360,
      repeat: -1,
      ease: "linear",
      duration: 2,
    });

    gsap.to(".letter", {
      scale: 1.4,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      duration: 0.8,
      stagger: {
        each: 0.15,
        repeat: -1,
        yoyo: true,
      },
    });

    gsap.fromTo(
      ".curve-wrapper",
      { scale: 0.85, opacity: 0.4 },
      {
        scale: 1,
        opacity: 1,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      }
    );

    gsap.to(".scroll-arrow", {
      opacity: 0.3,
      scale: 1.5,
      y: 6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.15,
    });

    // Enhanced scroll indicator fade out
    gsap.to(".scroll-indicator", {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: "#smooth-content",
        start: "top top",
        end: "top+=100px top",
        scrub: true,
        onEnter: () => {
          gsap.to(".scroll-indicator", { 
            opacity: 0, 
            duration: 0.3 
          });
        },
        onLeaveBack: () => {
          gsap.to(".scroll-indicator", { 
            opacity: 1, 
            duration: 0.3 
          });
        }
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full z-10"
      style={{
        backgroundColor: "#121212",
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 1px, transparent 0),
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 0),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 0)
        `,
        backgroundSize: "40px 40px, 20px 20px, 20px 20px",
      }}
    >
      {/* Grid Background Layers */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.03) 10px, rgba(255, 255, 255, 0.03) 20px)`,
          opacity: 0.8,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: 0.6,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Moving Text - Now white */}
      <div className="absolute top-1/2 transform -translate-y-1/2 whitespace-nowrap z-10 w-full flex justify-center">
        <h1 ref={nameRef} className="ss-font text-[8rem] flex gap-4 text-white">
          {"Ragothaman".split("").map((char, i) => (
            <span key={i} className="inline-block letter">{char}</span>
          ))}
        </h1>
      </div>

      {/* Curved Text */}
      <div className="curve-wrapper absolute top-[45%] left-1/2 transform -translate-x-1/2 z-0">
        <svg viewBox="0 0 800 200" width="800" height="200">
          <defs>
            <path id="curve" d="M 0 150 Q 200 0 400 150 T 800 150" fill="transparent" />
          </defs>
          <text fontSize="60" fill="white">
            <textPath href="#curve" startOffset="100%">Ragothaman</textPath>
          </text>
        </svg>
      </div>

      {/* Hero Image */}
      <div className="absolute bottom-0 w-full z-10">
        <img src={heroImage} alt="Hero" className="hero" />
      </div>

      {/* Spinner */}
      <div className="w-32 h-32 rounded-full absolute flex items-center justify-center z-10" style={{ bottom: "5%", right: "5%" }}>
        <div ref={spinnerRef} className="absolute w-full h-full border-4 border-t-white border-r-white border-b-transparent border-l-transparent rounded-full"></div>
        <img ref={innerImageRef} src={spinnerImage} alt="icon" className="w-20 h-20 z-10" />
      </div>

      {/* Scroll Indicators - Will disappear on scroll */}
      <div className="scroll-indicator absolute bottom-10 left-8 z-20 flex flex-col items-start gap-2">
        <p className="text-white text-lg font-medium glow-text">Scroll Down</p>
        <div className="flex flex-col gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="scroll-arrow w-2 h-2 rounded-full bg-white" />
          ))}
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-4 z-20 flex flex-col items-center gap-2" style={{ left: "20%" }}>
        {[...Array(4)].map((_, i) => (
          <svg key={i} className="scroll-arrow w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 16L6 10H18L12 16Z" />
          </svg>
        ))}
      </div>

      <div className="scroll-indicator absolute bottom-4 z-20 flex flex-col items-center gap-2" style={{ right: "20%" }}>
        {[...Array(4)].map((_, i) => (
          <svg key={i} className="scroll-arrow w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 16L6 10H18L12 16Z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default Hero;