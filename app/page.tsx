import Main from "./components/main";
import dynamic from "next/dynamic";

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
      <AnimatedCursor
        color="255, 255, 255"
        clickables={["a", "*[data-clickable='true']"]}
      />
    </main>
  );
}
