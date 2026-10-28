import { useEffect, useState } from "react";
import Cursor from "./components/Cursor.jsx";
import Loader from "./components/Loader.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { TimelineSection, ExperienceSection, EXPERIENCE_ITEMS, EDUCATION_ITEMS } from "./components/Timeline.jsx";
import { usePortfolioEffects } from "./hooks/usePortfolioEffects.js";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 2200);
    const t2 = setTimeout(() => setRevealed(true), 2350);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  usePortfolioEffects(loaded);

  return (
    <>
      <Cursor />
      <Loader hidden={loaded} />
      <Navbar visible={revealed} />
      <Hero revealed={revealed} />
      <About />
      <Skills />
      <ExperienceSection
        id="experience"
        tag="My Journey"
        title="Experience"
        titleEm="Summary"
        subtitle="A collection of my work experience and the roles I have taken in various organizations"
        items={EXPERIENCE_ITEMS}
      />
      <Projects />
      <TimelineSection
        id="education"
        lineId="educationLine"
        tag="Education"
        title="Academic"
        titleEm="Background"
        subtitle="My education has been a journey of learning and development. Here are the details of my academic background"
        items={EDUCATION_ITEMS}
      />
      <Contact />
      <Footer />
    </>
  );
}