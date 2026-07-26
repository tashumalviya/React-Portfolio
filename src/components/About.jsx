import { motion } from "framer-motion";
import { useRef, useEffect } from "react"; // ✅ useEffect import kiya
import Typed from "typed.js";
import resumeUrl from "../assets/tashu-malviya-resume.pdf?url";
import PaperReveal from "./PaperImg";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function About() {
  const contentRef = useRef(null);
  const typedRef = useRef(null);

  useEffect(() => {
    if (!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: [
        "Full Stack Developer",
        "UI-UX Designer",
        "Coder",
        "Web Developer",
        "React Developer",
        "Java Enthusiast",
        "Frontend Developer",
        "Tech Enthusiast",
      ],
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
      loop: true,
      showCursor: false,
      });

    return () => {
      typed.destroy();
    };
  }, []);

  const onMove = (e) => {
    if (window.innerWidth <= 768) return;

    const el = contentRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const rx =
      ((e.clientY - rect.top - rect.height / 2) / rect.height) * -2.2;

    const ry =
      ((e.clientX - rect.left - rect.width / 2) / rect.width) * 2.2;

    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const onLeave = () => {
    if (contentRef.current) contentRef.current.style.transform = "";
  };

  return (
    <section className="about section" id="about">
      <div
        className="bg-marquee bg-marquee--slow"
        style={{ top: "18%" }}
        aria-hidden="true"
      >
        {[0, 1].map((n) => (
          <span key={n}>
            ABOUT • ABOUT • ABOUT • ABOUT • ABOUT • ABOUT •&nbsp;
          </span>
        ))}
      </div>

      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-image-wrap"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="about-img-bg"></div>

            <div className="about-img">
              <div className="about-img-placeholder">
                <span>TM</span>

                <div className="about-badge">
                  <PaperReveal />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            ref={contentRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.span variants={item} className="section-tag">
              About Me
            </motion.span>

            <motion.h2 variants={item} className="section-title">
              Hii! I am <em>Tashu</em>
            </motion.h2>

            <motion.h3 variants={item} className="about-role">
              I am a <span ref={typedRef}></span>
            </motion.h3>

            <motion.p variants={item}>
              I am a passionate Web Developer who loves transforming ideas into
              interactive and user-friendly web experiences. I enjoy learning
              new technologies, building creative projects, and continuously
              growing as a developer while solving real-world problems.
            </motion.p>

            <motion.p variants={item}>
              I'm constantly learning, experimenting, and building projects that
              bring ideas to life.
            </motion.p>

            <motion.div variants={item} className="about-tags">
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
              <span className="tag">JavaScript</span>
              <span className="tag">React.js</span>
              <span className="tag">Tailwind CSS</span>
              <span className="tag">GSAP</span>
              <span className="tag">Node.js</span>
            </motion.div>

            <motion.div variants={item}>
              <a
                href={resumeUrl}
                className="btn-outline"
                data-magnetic
                target="_blank"
                rel="noreferrer"
              >
                Download Resume ↓
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}