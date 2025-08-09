import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "/src/assets/img/hero-final.png";
import spinnerImage from "/src/assets/img/spin.png";
import crownGif2 from "/src/assets/img/Crown2.gif";
import arrowGif from "/src/assets/img/arrow.gif";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [showArrow, setShowArrow] = useState(true);
  const nameWrapperRef = useRef();
  const spinnerRef = useRef();
  const innerImageRef = useRef();

  useEffect(() => {
    // Hide arrow + text after 10 seconds
    const timer = setTimeout(() => {
      setShowArrow(false);
    }, 10000);

    // Spinner animations
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

    // Letter pulse animation
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
          gsap.to(".scroll-indicator", { opacity: 0, duration: 0.3 });
        },
        onLeaveBack: () => {
          gsap.to(".scroll-indicator", { opacity: 1, duration: 0.3 });
        },
      },
    });

    // Seamless infinite marquee for "Ragothaman"
    const el = nameWrapperRef.current;
    if (el) {
      el.innerHTML += el.innerHTML; // duplicate content for seamless loop
      const totalWidth = el.scrollWidth / 2;

      gsap.to(el, {
        x: `-=${totalWidth}`,
        duration: 10,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    }

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume/resume.pdf"; // Adjust to your resume file path
    link.download = "Ragothaman-resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-10 overflow-visible"
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
      {/* Grid overlays */}
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

      {/* Scrolling Name */}
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full overflow-hidden z-10">
        <div className="w-fit whitespace-nowrap" ref={nameWrapperRef}>
          <h1 className="giamlass-font text-[30rem] inline-block text-white py-2">
            {"Ragothaman   ".split("").map((char, i) => (
              <span key={i} className="inline-block letter">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* Crown */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-20 pr-16">
        <img src={crownGif2} alt="Crown" className="w-45 h-auto" />
      </div>

      {/* Hero image */}
      <div className="absolute bottom-0 w-full z-10">
        <img src={heroImage} alt="Hero" className="hero" />
      </div>

      {/* Spinner + arrow + text container */}
      <div
        className="absolute z-20 flex items-center cursor-pointer"
        onClick={downloadResume}
        title="Download Resume"
        style={{ gap: "1rem", bottom: "0.5rem", right: "3rem" }}
      >
        {/* Arrow + text on the left */}
        {showArrow && (
          <div
            className="flex flex-col items-center select-none text-white"
            style={{ userSelect: "none", pointerEvents: "auto", width: "8rem" }}
          >
            <img
              src={arrowGif}
              alt="Arrow pointing right"
              className="w-34 h-40 mb-1"
              style={{ transform: "rotate(210deg) scaleX(-1)" }}
            />
            <p>click this this download resume</p>
          </div>
        )}

        {/* Spinner circle on the right */}
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center relative bottom-5 right"
          style={{ position: "relative" }}
        >
          {/* Spinner ring */}
          <div
            ref={spinnerRef}
            className="absolute top-0 left-0 w-full h-full border-4 border-t-white border-r-white border-b-transparent border-l-transparent rounded-full"
          ></div>

          {/* Inner spinning image */}
          <img
            ref={innerImageRef}
            src={spinnerImage}
            alt="icon"
            className="w-20 h-20 z-10"
          />
        </div>
      </div>

      {/* Scroll indicators */}
      <div className="scroll-indicator absolute bottom-10 left-8 z-20 flex flex-col items-start gap-2">
        <p className="text-white text-lg font-medium glow-text">Scroll Down</p>
        <div className="flex flex-col gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="scroll-arrow w-2 h-2 rounded-full bg-white" />
          ))}
        </div>
      </div>

      {/* Left arrows */}
      <div
        className="scroll-indicator absolute bottom-4 z-20 flex flex-col items-center gap-2"
        style={{ left: "20%" }}
      >
        {[...Array(4)].map((_, i) => (
          <svg
            key={i}
            className="scroll-arrow w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 16L6 10H18L12 16Z" />
          </svg>
        ))}
      </div>

      {/* Right arrows */}
      <div
        className="scroll-indicator absolute bottom-4 z-20 flex flex-col items-center gap-2"
        style={{ right: "20%" }}
      >
        {[...Array(4)].map((_, i) => (
          <svg
            key={i}
            className="scroll-arrow w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 16L6 10H18L12 16Z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default Hero;
