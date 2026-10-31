import sirtLogo from "../assets/sirt-logo.gif";
import schoolLogo from "../assets/school-logo.png";
import internpeLogo from "../assets/internpe-logo.png"
import yhillsLogo from "../assets/yhills-logo.png"
import codesoftLogo from "../assets/codesoft-logo.png"
import alphawizzLogo from "../assets/alphawizz.jpg"

const LOGOS = { sirt: sirtLogo, school: schoolLogo , internpe: internpeLogo , yhills: yhillsLogo, codesoft: codesoftLogo , alphawizz: alphawizzLogo};

export function TimelineSection({ id, lineId, tag, title, titleEm, subtitle, items }) {
  return (
    <section className="timeline-section section" id={id}>
      <div className="bg-marquee bg-marquee--slow" style={{ top: "35%" }} aria-hidden="true">
        {[0, 1].map((n) => (
          <span key={n}>{tag.toUpperCase()} • {tag.toUpperCase()} • {tag.toUpperCase()} • {tag.toUpperCase()} •&nbsp;</span>
        ))}
      </div>
      <div className="container">
        <div className="section-header animate-up">
          <span className="section-tag">{tag}</span>
          <h2 className="section-title">{title} <em>{titleEm}</em></h2>
          <p><em>{subtitle}</em></p>
        </div>
        <div className="timeline">
          <div className="timeline-line" id={lineId}></div>
          {items.map((item, i) => (
            <div key={i} className={`timeline-item ${item.side} animate-tl`}>
              <div className="tl-dot"></div>
              <div className="tl-card">
                {item.logo && (
                  <img style={{ width: 40, height: 40, objectFit: "contain" }} src={LOGOS[item.logo]} alt={`${item.title} logo`} loading="lazy" />
                )}
                <span className="tl-date">{item.date}</span>
                <h3>{item.title}</h3>
                {item.subTitle && <h5>{item.subTitle}</h5>}
                {item.company && <span className="tl-company">{item.company}</span>}
                {item.grade && (<><span className="tl-company-b">{item.grade}</span></>)}
                <p>{item.desc}</p>
                {item.skills && (<><h3>SKILLS : </h3>{item.skills.map((s) => (<span key={s} className="tag">{s}</span>))}</>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection({ id, tag, title, titleEm, subtitle, items }) {
  const label = `${tag.toUpperCase()} • `.repeat(4);
  return (
    <section className="exp-h" id={id}>
      <div className="bg-marquee bg-marquee--slow" style={{ top: "8%" }} aria-hidden="true">
        {[0, 1].map((n) => (<span key={n}>{label}&nbsp;</span>))}
      </div>
      <div className="exp-h-pin">
        <div className="container">
          <div className="section-header animate-up">
            <span className="section-tag">{tag}</span>
            <h2 className="section-title">{title} <em>{titleEm}</em></h2>
            <p className="section-sub">{subtitle}</p>
          </div>
        </div>
        <div className="exp-h-viewport">
          <div className="exp-h-track">
            {items.map((item, i) => (
              <article className="exp-card" key={i} data-tilt>
                <div className="exp-card-top">
                  <span className="exp-index">{String(i + 1).padStart(2, "0")}</span>
                  {item.logo && (
                    <img className="exp-logo" src={LOGOS[item.logo]} alt={`${item.company} logo`} loading="lazy" />
                  )}
                </div>
                <span className="tl-date">{item.date}</span>
                <h3>{item.title}</h3>
                {item.company && <span className="tl-company">{item.company}</span>}
                <p>{item.desc}</p>
                {item.skills && (
                  <div className="exp-skills">
                    {item.skills.map((s) => (<span key={s} className="tag">{s}</span>))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
        <div className="exp-h-progress" aria-hidden="true"><span></span></div>
      </div>
    </section>
  );
}

export const EXPERIENCE_ITEMS = [
{
    side: "tl-left",
    logo: "alphawizz",
    date: "Aug 2026 - Oct 2026 • Internship",
    title: "Frontend Developer Intern",
    company: "Alphawizz Technology, Indore",
    desc: "Worked on 8+ frontend projects using React.js, JavaScript, and DOM manipulation. Developed responsive and interactive user interfaces, implemented dynamic UI functionality, and created reusable components to improve user experience and application usability. Gained practical experience in frontend development and building user-focused web applications.",
    skills: ["React.js", "JavaScript", "DOM Manipulation", "Responsive Design", "UI Development", "Component Development" ]
  },
  {
    side: "tl-right",
    logo: "internpe",
    date: "Nov 2025 - Dec 2025 • Virtual Internship",
    title: "Web Development Intern",
    company: "InternPe",
    desc: "Developed 5+ responsive web pages using HTML, CSS, and JavaScript. Implemented 5+ interactive UI components and completed multiple frontend development tasks while maintaining responsive layouts and cross-browser compatibility. Strengthened practical knowledge of frontend development and website usability.",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design", "UI Development", "Frontend Development" ]
  },
  {
    side: "tl-left",
    logo: "yhills",
    date: "Oct 2024 - Nov 2024 • Virtual Internship",
    title: "Java Programming Intern",
    company: "YHills Edutech Pvt. Ltd.",
    desc: "Developed 10+ Java programming solutions using Core Java, OOP concepts, and data structures. Completed 20+ coding assignments and debugging challenges, applying object-oriented principles to write clean, reusable, and maintainable code. Improved analytical thinking and problem-solving skills through practical coding exercises.",
    skills: ["Core Java", "OOP", "Data Structures", "Problem Solving", "Debugging", "Code Optimization" ]
  },
  {
    side: "tl-right",
    logo: "codesoft",
    date: "Nov 2024 - Dec 2024 • Virtual Internship",
    title: "C++ Programming Intern",
    company: "CodSoft",
    desc: "Completed a 4-week virtual internship focused on C++ programming. Worked on practical coding tasks and projects involving object-oriented programming, algorithms, and problem-solving. Strengthened programming fundamentals and gained hands-on experience in developing structured C++ solutions.",
    skills: [ "C++", "OOP", "Algorithms", "Problem Solving", "Programming Fundamentals", "Project Development"]
  }
];

export const EDUCATION_ITEMS = [
  { side: "tl-left", logo: "sirt", date: "2023 — Present", title: "Bachelor of Technology",
    subTitle: "B.Tech, Computer Science & Engineering", grade: "Grade: 7.78 CGPA (5th Semester)",
    desc: "Pursuing a Bachelor of Technology (B.Tech) in Computer Science & Engineering from Sagar Institute of Research & Technology, Bhopal. Building strong knowledge in programming, data structures and algorithms, database management systems, web development, and software engineering. Actively participating in workshops, coding activities, and technical projects to strengthen practical experience, problem-solving abilities, and professional development. Continuously enhancing technical and analytical skills to build a strong foundation for a career in software and technology." },
  { side: "tl-right", logo: "school", date: "2023", title: "M.P Board Class XII",
    subTitle: "School For Excellence , Dewas M.P", grade: "Grade - 85.6%",
    desc: "Completed Senior Secondary Examination (Class XII) from School for Excellence, Dewas, under the MP Board. Studied core subjects including Physics, Chemistry, Mathematics, English, and Hindi. Achieved strong academic performance while actively participating in school activities and academic projects. Developed analytical thinking, problem-solving, communication, and teamwork skills through coursework and extracurricular involvement. Built a strong academic foundation supporting further studies in engineering and technology." },
  { side: "tl-left", logo: "school", date: "2021", title: "M.P Board - Class X",
    subTitle: "School For Excellence , Dewas M.P", grade: "Grade - 90%",
    desc: "Completed Secondary Education (Class X) from School For Excellence, Dewas , under the Madhya Pradesh Board of Secondary Education (MPBSE). Studied subjects including Math, Science, History, Civics, Economics, Hindi and English. Achieved strong academic performance while actively participating in school activities and projects. Developed analytical thinking, communication, and problem-solving skills, creating a strong foundation for higher education." },
];