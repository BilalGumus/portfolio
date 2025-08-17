"use client";

import { motion } from "motion/react";

export default function Hero() {
  return (
    <div className="border-b-[1px] border-b-[#222225]">
      <div className="h-full 2xl:container 2xl:mx-auto text-white">
        <div className="h-full min-h-[min(862px,80dvh)] p-8 flex items-center">
          <motion.h2
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-[24.5px] lg:text-[28px] font-sentient tracking-tight leading-tight"
          >
            As a full-stack web developer and computer engineer, I focus on
            building practical and user-friendly web applications that create
            genuine value. Using modern technologies such as React and Node.js,
            I develop solutions that are efficient, scalable, and tailored to
            meet real-world needs.
          </motion.h2>
        </div>
      </div>
    </div>
  );
}
