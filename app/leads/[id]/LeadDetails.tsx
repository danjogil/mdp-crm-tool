"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Lead } from "@prisma/client";

interface Props {
  lead: Lead | null;
}

const LeadDetails: React.FC<Props> = ({ lead }) => {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative z-20"
    >
      <div className="mt-20 text-white px-4 pb-4 flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mt-3">
            <h1 className="text-2xl sm:text-3xl font-semibold">{lead?.name}</h1>
            <div className="flex gap-3">
              <Link href={`/leads`}>
                <Button className="bg-zinc-900 text-zinc-50 border border-zinc-700 hover:bg-zinc-800">
                  &larr; Go Back
                </Button>
              </Link>
              <Link href={`/leads/${lead?.id}/edit`}>
                <Button className="bg-zinc-50 text-zinc-900 hover:bg-zinc-300">
                  Edit lead
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex gap-3 sm:items-center flex-col sm:flex-row sm:justify-between mb-5 border rounded-md p-4 border-zinc-800 bg-zinc-900">
            <div className="flex gap-3 items-center">
              <p
                className={`border rounded-md p-1 px-4 ${
                  lead?.status === "ACTIVE" && "border-green-500 text-green-500"
                } ${
                  lead?.status === "INACTIVE" && "border-zinc-500 text-zinc-500"
                } ${
                  lead?.status === "CLOSED" && "border-amber-500 text-amber-500"
                }`}
              >
                {lead?.status}
              </p>
              <p className="text-zinc-300">
                {format(lead?.date as Date, "dd.MM.yyyy")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <p className="text-zinc-300">{lead?.nationality}</p>
              <p className="text-zinc-300">{lead?.number}</p>
              <p className="text-zinc-300">{lead?.email}</p>
            </div>
          </div>

          <h1 className="text-xl font-medium">Requirements</h1>
          <div className="h-full gap-3 flex flex-col text-zinc-300 mb-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <p className="uppercase border border-zinc-800 p-4 rounded-md bg-zinc-900 grow">
                €{lead?.budget}
              </p>
              <p className="uppercase border border-zinc-800 p-4 rounded-md bg-zinc-900 grow">
                {lead?.property}
              </p>
              <p className="uppercase border border-zinc-800 p-4 rounded-md bg-zinc-900 grow">
                {lead?.area}
              </p>
              <p className="uppercase border border-zinc-800 p-4 rounded-md bg-zinc-900 grow">
                {lead?.beds} beds
              </p>
            </div>
          </div>

          <div className="flex gap-3 flex-col mb-5">
            <h1 className="text-xl font-medium">Extra Requirements</h1>
            <div className="border border-zinc-800 rounded-md min-h-20 p-4 bg-zinc-900">
              {lead?.extra}
            </div>
          </div>

          <div className="flex gap-3 flex-col">
            <h1 className="text-xl font-medium">Comments</h1>
            <div className="border border-zinc-800 rounded-md min-h-20 p-4 bg-zinc-900">
              {lead?.comment}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LeadDetails;
