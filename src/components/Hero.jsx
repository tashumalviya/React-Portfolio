import { Suspense, lazy, useEffect, useRef, useState } from "react";
import Typed from "typed.js";

const KeyboardScene = lazy(() => import("./KeyboardScene.jsx"));

export default function Hero({ revealed }) {
  const [mounted, setMounted] = useState(false);
  const typedRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: [
        "Creative Developer and Designer",
      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
      // showCursor: true,
      cursorChar: "|",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const show = revealed ? "show" : "";

  return (
    <section className="hero" id="home">
      <div className="hero-3d" aria-hidden="true">
        {mounted && (
          <Suspense fallback={null}>
            <KeyboardScene />
          </Suspense>
        )}
      </div>

      <div className="hero-content">
        <p className={`hero-eyebrow reveal-text ${show}`}>
          ✦ <span ref={typedRef}></span>
        </p>

        <h1 className="hero-title">
          <span className={`word-reveal ${show}`}>I Build</span>
          <em className={`word-reveal italic-word ${show}`}>Beautiful</em>
          <span className={`word-reveal ${show}`}>Digital</span>
          <span className={`word-reveal ${show}`}>Worlds</span>
        </h1>

        <p className={`hero-desc reveal-fade ${show}`}>
          I create modern, responsive, and user-friendly web experiences using
          React and JavaScript. Passionate about learning new technologies and
          building creative projects that solve real-world problems.
        </p>

        <div className={`hero-cta reveal-fade ${show}`}>
          <a
            href="#projects"
            className="btn-magnetic btn-primary"
            data-magnetic
          >
            <span>View My Work</span>
            <div className="btn-ripple"></div>
          </a>

          <a
            href="#contact"
            className="btn-ghost"
            data-magnetic
          >
            Say Hello →
          </a>
        </div>

        <div className={`hero-scroll reveal-fade ${show}`}>
          <div className="scroll-indicator">
            <span className="scroll-dot"></span>
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}