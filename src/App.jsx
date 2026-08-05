import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./ThemeContext";
import IntroScreen from "./components/IntroScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects   from "./components/Projects";
import Principles from "./components/Principles";
import Terminal   from "./components/Terminal";
import Timeline   from "./components/Timeline";
import Education  from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import ScrollTop from "./components/ScrollTop";

export default function App() {
  // Show the intro only on a visitor's first visit. Repeat visits (and
  // recruiters who come back) skip straight to content — no friction.
  const [intro, setIntro] = useState(() => {
    try { return localStorage.getItem("portfolio-intro-seen") !== "1"; }
    catch { return true; }
  });

  const finishIntro = () => {
    setIntro(false);
    try { localStorage.setItem("portfolio-intro-seen", "1"); }
    catch { /* localStorage unavailable — intro will just replay next visit */ }
  };

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <IntroScreen visible={intro} onDone={finishIntro} />
        <Cursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Principles />
          <Terminal />
          <Timeline />
          <Education />
          <Contact />
        </main>
        <Footer />
        <ScrollTop />
      </MotionConfig>
    </ThemeProvider>
  );
}
