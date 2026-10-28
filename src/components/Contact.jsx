import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSending(true);
    try {
      await emailjs.send(
        "service_yrfa9i8",
        "template_3j0c296",
        { name: data.get("name"), email: data.get("email"), message: data.get("message") },
        "-R4HBIrq12BwzD5F9"
      );
      alert("Message Sent Successfully!");
      form.reset();
    } catch (error) {
      alert("Error: " + JSON.stringify(error));
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact section" id="contact">
      <div className="bg-marquee bg-marquee--slow" style={{ top: "30%" }} aria-hidden="true">
        {[0, 1].map((n) => (<span key={n}>CONTACT • CONTACT • CONTACT • CONTACT •&nbsp;</span>))}
      </div>
      <div className="container">
        <div className="section-header animate-up">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Let's <em>Connect</em></h2>
          <p className="section-sub">Have a project in mind? I'd love to hear about it. Send me a message and let's make something incredible together.</p>
        </div>
        <div className="contact-inner">
          <div className="contact-content animate-left">
            <div className="contact-info">
              <a href="mailto:malviyatashu@gmail.com" className="contact-link"><span className="c-icon">✉</span>malviyatashu@gmail.com</a>
              <a href="#" className="contact-link"><span className="c-icon">📍</span>Bhopal, India</a>
              <a href="#" className="contact-link"><span className="c-icon">💼</span>Open for Freelance</a>
            </div>
            <div className="social-links">
              <a href="https://github.com/tashumalviya" target="_blank" rel="noreferrer" className="social-btn" data-magnetic style={{ fontSize: 25 }}><i className="ri-github-fill"></i></a>
              <a href="https://www.linkedin.com/in/tashu-malviya/" target="_blank" rel="noreferrer" className="social-btn" data-magnetic style={{ fontSize: 25 }}><i className="ri-linkedin-line"></i></a>
              <a href="https://www.instagram.com/its_tashu_21/?hl=en" target="_blank" rel="noreferrer" className="social-btn" data-magnetic style={{ fontSize: 25 }}><i className="ri-instagram-line"></i></a>
            </div>
          </div>
          <form className="contact-form animate-right" id="contactForm" onSubmit={onSubmit}>
            <div className="form-group"><input type="text" id="name" name="name" required autoComplete="off" /><label htmlFor="name">Your Name</label><span className="form-line"></span></div>
            <div className="form-group"><input type="email" id="email" name="email" required autoComplete="off" /><label htmlFor="email">Email Address</label><span className="form-line"></span></div>
            <div className="form-group"><input type="text" id="subject" name="subject" required autoComplete="off" /><label htmlFor="subject">Subject</label><span className="form-line"></span></div>
            <div className="form-group"><textarea id="message" name="message" rows={4} required></textarea><label htmlFor="message">Your Message</label><span className="form-line"></span></div>
            <button type="submit" className="btn-submit" data-magnetic disabled={sending}>
              <span className="btn-text">{sending ? "Sending..." : "Send Message"}</span>
              <span className="btn-icon">→</span>
              <div className="btn-loader"></div>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}