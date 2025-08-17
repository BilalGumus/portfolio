import dynamic from "next/dynamic";
import About from "./components/about";
import { BuyMeACoffee } from "./components/buymeacoffee";
import Contact from "./components/contact";
import Education from "./components/education";
import Hero from "./components/hero";
import Main from "./components/main";
import Projects from "./components/projects";
import WorkingExperience from "./components/working-experience";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
  loading() {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen z-30 bg-black"></div>
    );
  },
});

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Main />
      <About />
      <Hero />
      <Projects />
      <Education />
      <WorkingExperience />
      <Contact />
      <BuyMeACoffee />
      <AnimatedCursor
        color="255, 255, 255"
        clickables={["a", "*[data-clickable='true']"]}
      />
    </main>
  );
}
