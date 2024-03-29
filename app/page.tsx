"use client";

import { motion } from "framer-motion";
import { BackgroundBeams } from "./components/ui/Beams";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-zinc-900 h-screen">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold text-white text-center z-20">
          Marbella Dreams Properties.
        </div>
        <div className="font-extralight text-base md:text-4xl text-neutral-300 py-4 z-20">
          Client Database
        </div>
        <button className="bg-white rounded-full w-fit text-black px-4 py-2 cursor-pointer z-20">
          <Link href="/login">Login</Link>
        </button>
      </motion.div>
      <BackgroundBeams />
    </div>
  );
}
