import { useEffect, useState } from "react";
import "./Navbar.css"

const LINKS = [
  { href: "#about", label: "About", section: "about" },
  { href: "#skills", label: "Skills", section: "skills" },
  { href: "#experience", label: "Journey", section: "experience" },
  { href: "#projects", label: "Work", section: "projects" },
  { href: "#education", label: "Education", section: "education" },
  { href: "#contact", label: "Contact", section: "contact" },
];

export default function Navbar({ visible }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const scrollY = window.scrollY + 100;
      document.querySelectorAll("section[id]").forEach((sec) => {
        if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) setActive(sec.id);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); document.removeEventListener("keydown", onKey); };
  }, []);

  return (
    <>
      <nav className={`navbar ${visible ? "visible" : ""} ${scrolled ? "scrolled" : ""}`} id="navbar">
        <a href="#home" className="nav-logo">TASHU MALVIYA</a>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.section} href={l.href} className={`nav-link ${active === l.section ? "active" : ""}`} data-section={l.section}>{l.label}</a>
          ))}
        </div>
        <div className={`nav-hamburger ${menuOpen ? "open" : ""}`} id="hamburger" onClick={() => setMenuOpen((o) => !o)}>
          <span></span><span></span><span></span>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} id="mobileMenu">
        {LINKS.map((l) => (
          <a key={l.section} href={l.href} className="mobile-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
      </div>
    </>
  );
}
