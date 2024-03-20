"use client";

import NewLeadForm from "./NewLeadForm";
import { motion } from "framer-motion";

const NewLeadPage = () => {
  return (
    <div className="p-4 text-white bg-zinc-900 h-screen">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 w-full z-20"
      >
        <NewLeadForm />
      </motion.div>
    </div>
  );
};

export default NewLeadPage;
