import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const isMobile = () => window.innerWidth <= 768;

export function usePortfolioEffects(ready) {
  useEffect(() => {
    if (!ready) return;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const target = document.querySelector(link.getAttribute("href") || "");
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -60 });
    };
    document.addEventListener("click", onAnchorClick);

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".animate-up, .animate-left, .animate-right, .section-header, .project-card")
      .forEach((el) => revealObserver.observe(el));

    const cleanups = [];
    ["experience", "education"].forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      const line = section?.querySelector(".timeline-line");
      if (!section || !line) return;
      const tlItems = [...section.querySelectorAll(".animate-tl")];
      const shown = new Set();
      const tlObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = tlItems.indexOf(entry.target);
            if (!shown.has(idx)) { shown.add(idx); setTimeout(() => entry.target.classList.add("show"), idx * 200); }
            tlObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      tlItems.forEach((item) => tlObserver.observe(item));
      const onScroll = () => {
        const rect = section.getBoundingClientRect();
        const progress = clamp((-rect.top + window.innerHeight * 0.3) / (section.offsetHeight * 0.85), 0, 1);
        line.style.height = progress * 100 + "%";
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => { window.removeEventListener("scroll", onScroll); tlObserver.disconnect(); });
    });

       // Experience: cards drift horizontally with scroll (no pin, smooth scrub) — desktop only
    const mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
      const sec = document.querySelector(".exp-h");
      const track = sec?.querySelector(".exp-h-track");
      if (!sec || !track) return;
      const pad = () => window.innerWidth * 0.06;
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.fromTo(
        track,
        { x: () => pad() },
        {
          x: () => -(dist() + pad()),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: sec,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    });
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 400);

    if (!isMobile()) {
      document.querySelectorAll("[data-tilt]").forEach((card) => {
        const onMove = (e) => {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const rx = ((e.clientY - cy) / (rect.height / 2)) * -6;
          const ry = ((e.clientX - cx) / (rect.width / 2)) * 6;
          card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
        };
        const onLeave = () => {
          card.style.transform = "";
          card.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          setTimeout(() => (card.style.transition = ""), 500);
        };
        const onEnter = () => (card.style.transition = "transform 0.1s");
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        card.addEventListener("mouseenter", onEnter);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
          card.removeEventListener("mouseenter", onEnter);
        });
      });
    }

    if (!isMobile()) {
      document.querySelectorAll("[data-magnetic]").forEach((el) => {
        const onMove = (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
        };
        const onLeave = () => {
          el.style.transform = "";
          el.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
          setTimeout(() => (el.style.transition = ""), 400);
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    const onRipple = (e) => {
      const btn = e.target.closest(".btn-primary, .btn-submit, .social-btn");
      if (!btn) return;
      btn.querySelector(".btn-ripple")?.remove();
      const ripple = document.createElement("div");
      ripple.className = "btn-ripple";
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };
    document.addEventListener("click", onRipple);

    let parallaxHandler = null;
    if (!isMobile()) {
      const imgWrap = document.querySelector(".about-image-wrap");
      if (imgWrap) {
        parallaxHandler = () => {
          const rect = imgWrap.getBoundingClientRect();
          const center = rect.top + rect.height / 2 - window.innerHeight / 2;
          imgWrap.style.translate = `0 ${center * 0.04}px`;
        };
        window.addEventListener("scroll", parallaxHandler, { passive: true });
      }
    }

    const bar = document.createElement("div");
    bar.style.cssText = "position:fixed;top:0;left:0;height:2px;width:0;z-index:9999;background:linear-gradient(90deg,#4F8CFF,#8B5CF6,#5EEAD4);transition:width 0.1s;pointer-events:none;";
    document.body.appendChild(bar);
    const onProgress = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", onProgress, { passive: true });

    return () => {
      document.removeEventListener("click", onAnchorClick);
      document.removeEventListener("click", onRipple);
      window.removeEventListener("scroll", onProgress);
      if (parallaxHandler) window.removeEventListener("scroll", parallaxHandler);
      bar.remove();
      clearTimeout(refreshTimer);
      mm.revert();
      revealObserver.disconnect();
      cleanups.forEach((fn) => fn());
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [ready]);
}