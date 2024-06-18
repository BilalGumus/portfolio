"use client";

import { Gradient } from "@/app/lib/gradient";
import AOS from "aos";
import "aos/dist/aos.css";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import ShuffleText from "./ShuffleText";

export default function Main() {
  useEffect(() => {
    const gradient: any = new Gradient();
    AOS.init({
      offset: 100,
    });
    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <section className="relative h-dvh w-dvw text-center p-[1.5rem] md:p-[2rem] lg:p-[2.5rem] !pb-[2rem] !md:pb-[2.5rem] border-b-[0.5px] border-[hsla(0,0%,100%,.2)]">
      <div className="h-full flex flex-col font-oswald uppercase">
        <div
          data-aos="fade"
          data-aos-duration="2000"
          className="flex flex-row justify-between text-sm text-left text-[--color-greyDark] font-light"
        >
          <span className="basis-[28px]"></span>
          <span>Portfolio</span>
          <span className="text-right">2024</span>
        </div>
        <div className="flex flex-col items-center justify-center pt-[2dvh] font-geist h-full">
          <h1
            data-aos="fade"
            data-aos-duration="2250"
            className="animate-text bg-gradient-to-tr from-[--color-offWhite] via-zinc-400 to-[--color-offWhite] inline-block text-transparent bg-clip-text text-[40px] lg:text-[52px] 2xl:text-[64px] font-bold tracking-tight"
          >
            <span lang="tr">Bilal Gümüş</span>
          </h1>
          <h3
            className="select-none text-sm lg:text-[15px] mt-4 text-[--color-greyDark]"
            data-aos="fade"
            data-aos-duration="2500"
          >
            Full Stack
            <br />
            Web{" "}
            <span
              className="inline-block text-left w-[9ch]"
              onClick={(e) => {
                const count = 200;
                const defaults = {
                  colors: ["001AFF", "0042FF", "006BB8", "003594", "000047"],
                  origin: {
                    x: e.clientX / window.innerWidth,
                    y: e.clientY / window.innerHeight,
                  },
                };

                function fire(particleRatio: number, opts: any) {
                  confetti({
                    ...defaults,
                    ...opts,
                    particleCount: Math.floor(count * particleRatio),
                  });
                }

                fire(0.25, {
                  spread: 26,
                  startVelocity: 55,
                });
                fire(0.2, {
                  spread: 60,
                });
                fire(0.35, {
                  spread: 100,
                  decay: 0.91,
                  scalar: 0.8,
                });
                fire(0.1, {
                  spread: 120,
                  startVelocity: 25,
                  decay: 0.92,
                  scalar: 1.2,
                });
                fire(0.1, {
                  spread: 120,
                  startVelocity: 45,
                });
              }}
            >
              <ShuffleText text="Developer" />
            </span>
          </h3>
        </div>
        <div
          data-aos="fade"
          data-aos-duration="2750"
          className="flex flex-row justify-between items-end text-sm text-left text-[--color-greyDark] font-light"
        >
          <div className="flex flex-col gap-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/BilalGumus/"
              className="w-fit text-[--color-greyDark] font-light hover:text-[--color-white] hover:underline no-underline"
            >
              Github
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/bilalgumus/"
              className="w-fit text-[--color-greyDark] font-light hover:text-[--color-white] hover:underline no-underline"
            >
              Linkedin
            </a>
            <div className="w-fit text-left">
              <a
                href="mailto:bilal.gumus@yahoo.com"
                className="flex items-center justify-center gap-1 text-[--color-greyDark] font-light hover:text-[--color-white] hover:underline no-underline"
              >
                Get in touch
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-3 mt-[1px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </a>
            </div>
          </div>
          <span></span>
          <a
            href="https://www.bilalgumus.co/"
            className="flex gap-1 justify-center items-center text-right lowercase hover:text-[--color-white] no-underline"
          >
            <span>bilalgumus.co</span>
          </a>
        </div>
      </div>
      <canvas
        id="gradient-canvas"
        data-transition-in
        className="absolute top-0 left-0 -z-10"
      />
    </section>
  );
}
