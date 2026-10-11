"use client";

const COLORS = {
  light: {
    background: "#F7F7F7",
    buttonPrimaryHover: "#333",
    tagBg: "#ECECEA",
  },
} as const;

const IMAGES = {
  phoneClouds: {
    path: "/hero.png",
    alt: "Smartphone floating in clouds",
  },
} as const;

import { motion } from "motion/react";
import Image from "next/image";

interface HeroProps {
  mode?: "light";
  tagText?: string;
  headingLine1?: string;
  headingLine2?: string;
  headingLine2_5?: string;
  descriptionLine1?: string;
  descriptionLine2?: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
}

// Main Component
export default function Hero({
  mode = "light",
  tagText = "For the money* not the students!",
  headingLine1 = "Mathematics",
  headingLine2 = "Your ",
  headingLine2_5 = "way",
  descriptionLine1 = "Our mission is to provide exceptional global",
  descriptionLine2 = "connectivity, to enhance humanity's potential.",
}: HeroProps) {
  const colors = COLORS[mode];

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      {/* Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        {/* Hero Content */}
        <div className="flex flex-col items-center pt-12 text-center">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span
              className="inline-block rounded-full px-4 py-2 text-xs font-medium tracking-wide text-[#6b6b6b]"
              style={{ backgroundColor: colors.tagBg }}
            >
              {tagText}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-6xl font-normal leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-7xl lg:text-8xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {headingLine1}
            <br />
            {headingLine2} <span className="italic underline hover:cursor-pointer hover:text-cyan-500 duration-200">{headingLine2_5}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-md font-serif text-base italic leading-relaxed text-[#6b6b6b]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {descriptionLine1}
            <br />
            {descriptionLine2}
          </motion.p>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative mt-8 w-full max-w-2xl"
          >
            <div className="relative aspect-4/3 w-full">
              <Image
                src={IMAGES.phoneClouds.path}
                alt={IMAGES.phoneClouds.alt}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
