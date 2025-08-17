"use client";

import { Gradient } from "@/app/lib/gradient";
import { motion } from "motion/react";
import { useEffect } from "react";
import Clock from "./clock";

export default function Main() {
  useEffect(() => {
    const gradient: any = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <section className="relative h-[min(1280px,100dvh)] w-dvw text-center p-[1.5rem] md:p-[2rem] lg:p-[2.5rem] !pb-[2rem] !md:pb-[2.5rem]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="font-oswald uppercase flex flex-row justify-between text-sm text-left text-[--color-white] font-light"
      >
        <span className="basis-[28px]"></span>
        <span>Portfolio</span>
        {/* <span className="text-right">
        </span> */}
        <Clock />
      </motion.div>
      <div className="h-full flex flex-col font-oswald">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center pb-[3dvh] h-full"
        >
          <motion.h1
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
            className="font-inter animate-text bg-gradient-to-tr from-[--color-black] via-[--color-white] to-[--color-black] inline-block text-transparent bg-clip-text text-[28px] lg:text-[33px] 2xl:text-[44px] tracking-tighter"
          >
            <span lang="tr">
              I craft ideas into powerful digital experiences.
            </span>
          </motion.h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.75 }}
          className="flex flex-row justify-center items-end text-sm text-left text-[--color-white] font-light"
        >
          <a
            href="https://www.bilalgumus.net/"
            className="flex gap-1 justify-center items-center text-right lowercase no-underline"
          >
            <span>bilalgumus.net</span>
          </a>
        </motion.div>
      </div>
      <canvas
        id="gradient-canvas"
        data-transition-in
        className="absolute top-0 left-0 -z-10"
      />
    </section>
  );
}
