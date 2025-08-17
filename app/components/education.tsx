"use client";

import { motion } from "motion/react";

export default function Education() {
  return (
    <div className="border-b-[1px] border-b-[#222225]">
      <div className="h-full 2xl:container 2xl:mx-auto text-white">
        <div className="h-full p-3 sm:p-8 flex items-center">
          <div className="flex flex-col h-full min-h-[min(512px,39dvh)] w-full justify-center">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center sm:text-left text-[24.5px] lg:text-[28px] font-sentient tracking-tight leading-tight pt-2 pb-4"
            >
              Education
            </motion.h2>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col gap-1 pb-5">
                <div className="flex flex-col sm:flex-row gap-1 justify-between items-center">
                  <h6 className="text-xl font-sentient tracking-tight leading-tight">
                    BSc, Computer Engineer
                  </h6>
                  <p className="text-md italic text-gray-300">2019-2023</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 justify-between items-center">
                  <h6 className="text-md tracking-tight leading-tight">
                    Cumulative GPA:{" "}
                    <span className="font-semibold">3.77/4.00</span>
                  </h6>
                  <p className="text-md">Selcuk University, TR</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
