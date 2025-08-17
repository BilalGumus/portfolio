"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function WorkingExperience() {
  const jobVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div id="experience" className="border-b-[1px] border-b-[#222225]">
      <div className="h-full 2xl:container 2xl:mx-auto flex flex-col lg:flex-row-reverse justify-between text-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full relative lg:max-w-[740px] min-h-[420px]"
        >
          <Image
            src="/images/palm.jpg"
            alt="palm tree"
            fill
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="w-full h-full min-h-[min(1024px,89dvh)] p-4 lg:p-8 grow flex flex-col justify-between">
          <div className="flex flex-col h-full justify-between">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-[24.5px] lg:text-[28px] font-sentient tracking-tight leading-tight pt-2 pb-4"
            >
              Working Experience
            </motion.h2>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                variants={jobVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="border-b-[1px] border-b-[#222225] pb-5"
              >
                <div className="flex flex-col sm:flex-row justify-between mb-2">
                  <h6 className="text-xl font-sentient tracking-tight leading-tight">
                    Univenn Startup Studio
                  </h6>
                  <p className="text-md italic sm:text-right text-gray-300">
                    Izmir, TR
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between">
                      <p className="text-md tracking-tight leading-tight">
                        Computer Engineer: Full Stack Web Developer
                      </p>
                      <p className="text-sm sm:text-right italic text-gray-300">
                        Aug. 2023 - Current
                      </p>
                    </div>
                    <p className="text-justify text-sm text-gray-400 mt-0.5">
                      Developed{" "}
                      <a
                        className="text-white hover:underline"
                        href="https://hrpanda.co/"
                        target="_blank"
                      >
                        HrPanda
                      </a>
                      , an ATS and job-sharing application, along with a Chrome
                      extension that scrapes applicant data from LinkedIn,
                      GitHub, and X, enabling efficient job posting, applicant
                      tracking, and role-based access management.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between">
                      <p className="text-md tracking-tight leading-tight">
                        Long Term Computer Engineer Intern
                      </p>
                      <p className="text-sm sm:text-right italic text-gray-300">
                        Oct. 2023 – Jun. 2023
                      </p>
                    </div>
                    <p className="text-justify text-sm text-gray-400 mt-0.5">
                      Developed{" "}
                      <a
                        className="text-white hover:underline"
                        href="https://x.com/getmagny"
                        target="_blank"
                      >
                        Magny
                      </a>
                      , a custom dashboard for Command Bar integration,
                      implemented real-time Sheets synchronization using sockets
                      for the Vue based project{" "}
                      <a
                        className="text-white hover:underline"
                        href="https://dovl.com/"
                        target="_blank"
                      >
                        Dovl
                      </a>{" "}
                      and built a chat application from scratch.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between">
                      <p className="text-md tracking-tight leading-tight">
                        Part Time FE Developer
                      </p>
                      <p className="text-sm sm:text-right italic text-gray-300">
                        Sep. 2022 – Nov. 2022{" "}
                      </p>
                    </div>
                    <p className="text-justify text-sm text-gray-400 mt-0.5">
                      Integrated WebRTC-based video calling using PeerJS for{" "}
                      <a
                        className="text-white hover:underline"
                        href="https://univerlive.com/"
                        target="_blank"
                      >
                        Univerlive
                      </a>{" "}
                      and resolved various frontend issues.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between">
                      <p className="text-md tracking-tight leading-tight">
                        Computer Engineer Intern
                      </p>
                      <p className="text-sm sm:text-right italic text-gray-300">
                        Jul. 2022 – Aug. 2022{" "}
                      </p>
                    </div>
                    <p className="text-justify text-sm text-gray-400 mt-0.5">
                      Contributed to{" "}
                      <a
                        className="text-white hover:underline"
                        href="https://univerlive.com/"
                        target="_blank"
                      >
                        Univerlive
                      </a>
                      's client, dashboard, and backend development, completing
                      multiple feature implementations and bug fixes.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                variants={jobVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="py-4"
              >
                <div className="flex flex-col sm:flex-row justify-between mb-2">
                  <h6 className="text-xl font-sentient tracking-tight leading-tight">
                    Republic of Turkey General Directorate of Highways
                  </h6>
                  <p className="text-md italic sm:text-right text-gray-300">
                    Kastamonu, TR
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between">
                      <p className="text-md tracking-tight leading-tight">
                        Computer Engineer Intern
                      </p>
                      <p className="text-sm sm:text-right italic text-gray-300">
                        Jul. 2021 – Aug. 2021
                      </p>
                    </div>
                    <p className="text-justify text-sm text-gray-400 mt-0.5">
                      Worked on the{" "}
                      <a
                        className="text-white hover:underline"
                        href="https://www.kgm.gov.tr/Sayfalar/KGM/SiteEng/Projeler/ProjelerDetay.aspx?q=12"
                        target="_blank"
                      >
                        Ilgaz 15 July Independence Tunnel
                      </a>{" "}
                      monitoring & control system for SCADA integration,
                      developed a MERN-stack microservice for user
                      authentication with Docker, and diagnosed and resolved
                      hardware issues within the institution.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-end"
          >
            <a
              href="mailto:bilal.gumus@yahoo.com"
              className="mt-16 bg-white text-black hover:bg-amber-600 hover:text-white transition-all duration-300 ease-in-out text-sm font-medium text-center py-2 px-4"
            >
              Request My Resume
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
