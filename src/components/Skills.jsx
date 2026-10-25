import { motion } from "framer-motion";
import { useRef } from "react";
import "./Skills.css"

const CATEGORIES = [
  { name: "Frontend", sub: "Interfaces & Experience", icon: "ri-layout-4-line",
    skills: [
      { label: "React", icon: "ri-reactjs-line" },
      { label: "HTML / CSS", icon: "ri-html5-line" },
      { label: "Tailwind CSS", icon: "ri-wind-line" },
      { label: "Three.js / GSAP", icon: "ri-shape-2-line" },
      { label: "Responsive Design", icon: "ri-smartphone-line" },
    ]},
  { name: "Backend", sub: "APIs & Servers", icon: "ri-server-line",
    skills: [
      { label: "Node.js / Express", icon: "ri-nodejs-line" },
      { label: "REST APIs", icon: "ri-links-line" },
    ]},
  { name: "Programming Languages", sub: "Core Foundations", icon: "ri-code-s-slash-line",
    skills: [
      { label: "JavaScript", icon: "ri-javascript-line" },
      { label: "Java", icon: "ri-cup-line" },
      { label: "C++", icon: "ri-terminal-box-line" },
    ]},
  { name: "Database", sub: "Data & Persistence", icon: "ri-database-2-line",
    skills: [
      { label: "MySQL", icon: "ri-stack-line" },
    ]},
  { name: "Tools", sub: "Design & Workflow", icon: "ri-tools-line",
    skills: [
      { label: "Git / GitHub", icon: "ri-github-line" },
      { label: "Vite", icon: "ri-flashlight-line" },
      { label: "Motion Design", icon: "ri-movie-line" },
    ]},
];

function SkillCard({ cat, index }) {
  const ref = useRef(null);
  const onMove = (e) => {
    if (window.innerWidth <= 768) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rx = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -5;
    const ry = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 5;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "";
    setTimeout(() => { if (el) el.style.transition = ""; }, 600);
  };
  return (
    <motion.div className="skill-glass" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 50, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}>
      <h3>
        <span className="skill-cat-icon" style={{ animationDelay: `${index * 0.6}s` }}><i className={cat.icon}></i></span>
        {cat.name}
      </h3>
      <span className="skill-cat-sub">{cat.sub}</span>
      <div className="skill-chips">
        {cat.skills.map((s) => (
          <span key={s.label} className="skill-chip"><i className={s.icon}></i>{s.label}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="bg-marquee bg-marquee--fast" style={{ top: "8%" }} aria-hidden="true">
        {[0, 1].map((n) => (
          <span key={n}>REACT • JAVASCRIPT • HTML • CSS • NODE • EXPRESS • MYSQL • GITHUB • VITE • FRONTEND •&nbsp;</span>
        ))}
      </div>
      <div className="container">
        <div className="section-header animate-up">
          <span className="section-tag">Expertise</span>
          <h2 className="section-title">Skills & <em>Mastery</em></h2>
          <p className="section-sub">Technologies I use to bring ideas to life</p>
        </div>
        <div className="skills-grid-premium">
          {CATEGORIES.map((cat, i) => (<SkillCard key={cat.name} cat={cat} index={i} />))}
        </div>
      </div>
    </section>
  );
}
