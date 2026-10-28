import { useEffect, useRef, useState } from "react";

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
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);

      // hide on scroll down, show on scroll up
      const delta = y - lastY.current;
      if (y < 80 || menuOpenRef.current) setHidden(false);
      else if (delta > 2) setHidden(true);
      else if (delta < -2) setHidden(false);
      lastY.current = y;

      const scrollY = y + 100;
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
      <nav className={`navbar ${visible ? "visible" : ""} ${scrolled ? "scrolled" : ""} ${hidden ? "nav-hidden" : ""}`} id="navbar">
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