import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaArrowUp } from "react-icons/fa";

const EMAIL = "malviyatashu@gmail.com";

const EXPLORE = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Education", href: "#education" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/tashumalviya", icon: <FaGithub /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tashu-malviya/", icon: <FaLinkedin /> },
  { label: "Instagram", href: "https://www.instagram.com/its_tashu_21/?hl=en", icon: <FaInstagram /> },
  { label: "Email", href: `mailto:${EMAIL}`, icon: <FaEnvelope /> },
];

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-line"></div>
      <div className="ft-big" aria-hidden="true">Tashu Malviya</div>

      <div className="ft-inner">
        <div className="ft-left">
          <a href="#home" className="ft-logo">TM</a>
          <p className="ft-tag">Turning ideas into reality, one line of code at a time.</p>
          <div className="ft-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label} aria-label={s.label}>{s.icon}</a>
            ))}
          </div>
        </div>

        <div className="ft-cols">
          <div className="ft-col">
            <h4>Explore</h4>
            {EXPLORE.map((l) => (<a key={l.label} href={l.href}>{l.label}</a>))}
          </div>
          <div className="ft-col">
            <h4>Connect</h4>
            {SOCIALS.slice(0, 3).map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
            <a href="#contact">Contact Form</a>
          </div>
          <div className="ft-col">
            <h4>Contact</h4>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span>Bhopal, India</span>
            <span>Open for Freelance</span>
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <p>© {new Date().getFullYear()} <span>Tashu Malviya</span>. All rights reserved.</p>
        <a href="#home" className="ft-top" aria-label="Back to top"><FaArrowUp /></a>
      </div>
    </footer>
  );
}