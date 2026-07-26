export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <span className="footer-logo">TM</span>
          <p>Crafted with ♥ by Tashu Malviya — 2026</p>
          <span className="footer-back" id="backToTop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑ Top</span>
        </div>
      </div>
    </footer>
  );
}
