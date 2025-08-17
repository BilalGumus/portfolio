"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function About() {
  return (
    <div id="about" className="border-b-[1px] border-b-[#222225]">
      <div className="h-full 2xl:container 2xl:mx-auto flex flex-col-reverse lg:flex-row justify-between text-white">
        <div className="h-full min-h-[min(1024px,89dvh)] p-8 max-w-[720px] lg:max-w-[600px] flex flex-col justify-between">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5"
          >
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-[28px] font-sentient tracking-tight leading-tight"
            >
              <span>I don't just write code.</span>
              <br />
              <span>I craft meaningful digital solutions.</span>
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              I'm a dedicated software engineer with a genuine passion for
              turning ideas into reliable, user-friendly applications. By
              combining clean code, thoughtful design, and modern technologies,
              I create solutions that deliver value and provide a smooth user
              experience. My goal is to make technology feel intuitive and
              accessible for everyone.
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Alongside client work, I enjoy exploring new tools, frameworks,
              and development approaches to stay ahead in an ever-changing
              industry. This curiosity not only helps me grow professionally but
              also allows me to contribute to building a more innovative and
              inclusive digital world.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-col gap-2"
          >
            <Image
              src="/images/me_filter.png"
              alt="Bilal Gümüş"
              width={50}
              height={50}
              className="rounded-full"
            />
            <h3 className="text-md text-[--color-grey]">
              Bilal Gümüş, Computer Engineer
            </h3>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "100px" }}
          className="w-full relative lg:max-w-[740px] min-h-[420px]"
        >
          <Image
            src="/images/tree.jpg"
            alt="tree"
            fill
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}
