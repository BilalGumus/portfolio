"use client";

import { motion } from "motion/react";
import Image from "next/image";

function Project({ url, image, title, description, badges }: any) {
  return (
    <a href={url} target="_blank">
      <div className="flex flex-col gap-3 group">
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <Image
            src={image}
            alt={title}
            width={1280}
            height={851}
            className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
          />
        </motion.div>
        <div className="flex flex-col gap-1 h-full">
          <div className="flex gap-1">
            {badges?.map((b: string) => (
              <motion.span
                key={b}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center justify-center rounded-md border border-gray-600 px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 transition-[color,box-shadow] overflow-hidden text-foreground"
              >
                {b}
              </motion.span>
            ))}
          </div>
          <h3 className="text-[20px] font-semibold tracking-tight leading-tight group-hover:text-amber-600 transition-all duration-300 ease-in-out">
            {title}
          </h3>
          {description && <p className="text-gray-400">{description}</p>}
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div id="projects" className="border-b-[1px] border-b-[#222225]">
      <div className="h-full container mx-auto w-full text-white p-8">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-[24.5px] lg:text-[28px] font-sentient tracking-tight leading-tight py-4"
        >
          Highlighted Projects
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 pb-4"
        >
          <motion.div variants={itemVariants}>
            <Project
              url="https://github.com/BilalGumus/portfolio"
              image="/images/1.jpg"
              title="Portfolio"
              description="My portfolio website which is you are currently viewing it."
              badges={["NextJS"]}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Project
              url="https://github.com/BilalGumus/react-face-auth"
              image="/images/2.jpg"
              title="React Face Auth"
              description="The Facial Recognition-Based Authentication Application is a
            cutting-edge web application developed using React and face-api.js."
              badges={["React", "face-api.js"]}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Project
              url="https://github.com/BilalGumus/php-social-media"
              image="/images/3.jpg"
              title="PHP Social Media"
              description="Selçuk Sözlük is a simple social media application developed with PHP."
              badges={["PHP"]}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Project
              url="https://github.com/BilalGumus/turkey-hks-scraper"
              image="/images/4.jpg"
              title="Turkey HKS Scraper"
              description="A Tauri desktop application that offers an interface for web scraping with Puppeteer."
              badges={["Tauri", "React", "NodeJS", "Puppeteer"]}
            />
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-start-3">
            <Project
              url="https://netuygun.bilalgumus.net/"
              image="/images/5.jpg"
              title="Netuygun"
              description="List, filter, and compare internet providers and over 300 tariffs in Türkiye for free. Track historical prices."
              badges={["NextJS", "Puppeteer"]}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
