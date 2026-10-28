import portfolioImg from "../assets/MacOS-portfolio.png";
import snapdishImg from "../assets/snapdish.png";
import teamSyncImg from "../assets/teamsync.png";

const PROJECTS = [

  {
    image: teamSyncImg,
    tags: ["React", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MySQL", "JWT Authentication"],
    title: "TeamSync - Team Management System",
    desc: "A modern Team Management System with a responsive React frontend and secure backend-powered authentication. Features include JWT-based login, role-based access, employee and department management, analytics dashboard, profile management, dark mode, and a clean, interactive UI. Built using React, Node.js, Express.js, and MySQL.",
    wide: false,
    dark: false,
    live: "https://team-sync-frontend-project.vercel.app/",
    github: "https://github.com/tashumalviya/Team_Sync---Frontend-Project",
  },

 {
    image: snapdishImg,
    tags: ["React", "Vite", "Tailwind CSS", "Responsive UI", "Recipe App"],
    title: "SnapDish — Recipe Sharing Platform",
    desc: "A modern recipe sharing platform where users can explore, discover, and upload delicious recipes through a clean, responsive interface with fast performance and an intuitive user experience.",
    wide: false, dark: false,
    live: "https://snap-dish-two.vercel.app/",
    github: "https://github.com/tashumalviya/SnapDish",
  },

  {
    image: portfolioImg,
    tags: ["React", "Vite", "SCSS"],
    title: "MacOS-inspired Desktop Interface",
    desc: "A modern MacOS-inspired portfolio featuring an interactive desktop experience with draggable app windows, a responsive dock, terminal interface, resume viewer, notes app, Spotify integration, and smooth animations.",
    wide: false, dark: false,
    live: " https://reactmaosportfolio.vercel.app/",
    github: "https://github.com/tashumalviya/React-MacOS-Portfolio",
  },

 

  { bg: "#F8F4E1", icon: "🤖", tags: ["Python", "OpenAI", "React"], title: "AI Writing Companion", desc: "An AI-powered writing assistant with voice input, real-time suggestions, and context-aware editing capabilities.", wide: false, dark: false },
  { bg: "#2B2B2B", icon: "🌍", tags: ["Three.js", "WebGL", "GLSL"], title: "Globe — 3D Data Visualization", desc: "An immersive 3D globe visualization showing global data flows, network connections, and geographic insights in real-time using WebGL shaders.", wide: true, dark: true },
];

export default function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div className="section-header animate-up">
          <span className="section-tag">Selected Work</span>
          <h2 className="section-title">Featured <em>Projects</em></h2>
          <p className="section-sub">A selection of recent work I'm proud of</p>
        </div>
        <div className="projects-stack">
          {PROJECTS.map((p, i) => (
            <div key={p.title} className="project-card project-card--stack" style={{ "--i": i }} data-tilt>
              <div className="project-img" style={{ "--bg": p.bg }}>
                <div className="project-img-inner">
                  {p.image
                    ? <img src={p.image} alt={p.title} className="project-image" />
                    : <span className="project-icon">{p.icon}</span>}
                </div>
                {(p.live || p.github) && (
                  <div className="project-overlay">
                    {p.live && (
                      <a href={p.live.trim()} target="_blank" rel="noopener noreferrer" className="project-link">View Live ↗</a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-github">GitHub ↗</a>
                    )}
                  </div>
                )}
              </div>
              <div className="project-info">
                <span className="project-num">{String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</span>
                <div className="project-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}