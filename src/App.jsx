import { useState } from "react";
import "./index.css";
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
  const [intro, setIntro] = useState(true);

  return (
    <ThemeProvider>
      <IntroScreen visible={intro} onDone={() => setIntro(false)} />
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
    </ThemeProvider>
  );
}
