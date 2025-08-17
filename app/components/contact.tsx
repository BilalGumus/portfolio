"use client";

import { motion } from "motion/react";
import React from "react";

export default function Contact() {
  return (
    <div id="contact" className="border-b-[1px] border-b-[#222225]">
      <div className="h-full w-full 2xl:container 2xl:mx-auto text-white">
        <div className="h-full min-h-[min(596px,40dvh)] p-8 grid grid-cols-1 nmd:grid-cols-3">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-[24.5px] lg:text-[28px] font-sentient tracking-tight leading-tight self-center"
          >
            Contact
          </motion.h2>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-5 md:col-span-2"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p>Email</p>
              <a
                href="mailto:bilal.gumus@yahoo.com"
                target="_blank"
                className="text-gray-400 hover:text-white hover:underline"
              >
                bilal.gumus@yahoo.com
              </a>
            </motion.div>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p>Github</p>
              <a
                href="https://github.com/BilalGumus/"
                target="_blank"
                className="text-gray-400 hover:text-white hover:underline"
              >
                BilalGumus
              </a>
            </motion.div>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p>LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/bilalgumus/"
                target="_blank"
                className="text-gray-400 hover:text-white hover:underline"
              >
                bilalgumus
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
