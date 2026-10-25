import React from 'react'
import './Footer.css'
import { Link } from 'react-scroll'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaArrowUp, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
      <div className="footer-glow"></div>

      <div className="footer-inner">

        <div className="footer-columns">

          {/* Left - Get In Touch */}
          <div className="footer-contact">
            <h3>Get In Touch</h3>
            <p>Have a project in mind or just want to say hello? Feel free to reach out!</p>
            <ul className="contact-list">
              <li><FaMapMarkerAlt /><a href="https://www.google.com/maps/search/Maharajganj,+Uttar+Pradesh,+India" target="_blank" rel="noreferrer">India</a></li>
              <li><FaPhone /><a href="tel:+919569424472">+91 9569424472</a></li>
              <li><FaEnvelope /><a href="https://mail.google.com/mail/?view=cm&to=vijaylaxmi88582@gmail.com&su=Hello%20Vijaylaxmi%20-%20Portfolio%20Inquiry&body=Hi%20Vijaylaxmi%2C%0A%0AI%20visited%20your%20portfolio%20and%20would%20love%20to%20connect%20with%20you.%0A%0A" target="_blank" rel="noreferrer">vijaylaxmi88582@gmail.com</a></li>
            </ul>
            <div className="footer-socials">
              <a href="https://github.com/vijaylaxmi88582-art" target="_blank" rel="noreferrer" title="GitHub"><FaGithub /></a>
              <a href="https://linkedin.com/vijaylaxmi-prajapti-196602335" target="_blank" rel="noreferrer" title="LinkedIn"><FaLinkedin /></a>
              <a href="https://instagram.com/vijaylaxmi_prajapti" target="_blank" rel="noreferrer" title="Instagram"><FaInstagram /></a>
              <a href="https://mail.google.com/mail/?view=cm&to=vijaylaxmi88582@gmail.com&su=Hello%20Vijaylaxmi%20-%20Portfolio%20Inquiry&body=Hi%20Vijaylaxmi%2C%0A%0AI%20visited%20your%20portfolio%20and%20would%20love%20to%20connect%20with%20you.%0A%0A" target="_blank" rel="noreferrer" title="Email"><FaEnvelope /></a>
            </div>
          </div>

          {/* Right - Brand + Links */}
          <div className="footer-right">
            <div className="footer-brand">
              <h2>PORTFOLIO</h2>
              <p>Turning ideas into reality — one line of code at a time.</p>
            </div>

            <ul className="footer-nav">
              <Link to="home" smooth={true} duration={500}><li>Home</li></Link>
              <Link to="about" smooth={true} duration={500}><li>About</li></Link>
              <Link to="projects" smooth={true} duration={500}><li>Projects</li></Link>
              <Link to="skills" smooth={true} duration={500}><li>Skills</li></Link>
              <Link to="education" smooth={true} duration={500}><li>Education</li></Link>
              <Link to="contact" smooth={true} duration={500}><li>Contact</li></Link>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer-divider">
          <span></span><span className="dot"></span><span></span>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} <span>Portfolio</span>. All rights reserved.</p>
    
        </div>

      </div>
    </footer>
  )
}

export default Footer