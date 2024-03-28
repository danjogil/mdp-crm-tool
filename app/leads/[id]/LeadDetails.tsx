"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Lead } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import StatusSelect from "@/app/components/StatusSelect";
import { useRouter } from "next/navigation";

interface Props {
  lead: Lead | null;
}

const LeadDetails: React.FC<Props> = ({ lead }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative z-20 dark:bg-zinc-900 h-screen"
    >
      <div className="pt-20 dark:text-white px-4 pb-4 flex flex-col items-center dark:bg-zinc-900">
        <div className="w-full max-w-5xl flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mt-3">
            <h1 className="text-2xl sm:text-3xl font-semibold">{lead?.name}</h1>
            <div className="flex gap-3">
              <div>
                <Button
                  className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 border dark:border-zinc-800 border-slate-400 hover:bg-slate-100"
                  onClick={() => router.back()}
                >
                  &larr; Go Back
                </Button>
              </div>
              <Link href={`/leads/${lead?.id}/edit`}>
                <Button className="">Edit lead</Button>
              </Link>
            </div>
          </div>
          <div className="flex gap-3 sm:items-center flex-col sm:flex-row sm:justify-between mb-5 border rounded-md p-4 dark:border-zinc-800 dark:bg-zinc-900 shadow">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <p
                className={`border rounded-md p-1 px-4 hidden sm:block ${
                  lead?.status === "ACTIVE" && "border-green-500 text-green-500"
                } ${
                  lead?.status === "INACTIVE" && "border-zinc-500 text-zinc-500"
                } ${
                  lead?.status === "CLOSED" && "border-amber-500 text-amber-500"
                }`}
              >
                {lead?.status}
              </p>
              <StatusSelect
                id={lead?.id as string}
                status={lead?.status as string}
                className="flex sm:hidden max-w-xs"
              />
              <p className="dark:text-zinc-300">
                {format(lead?.date as Date, "dd.MM.yyyy")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <p className="dark:text-zinc-300">{lead?.nationality}</p>
              <p className="dark:text-zinc-300">{lead?.number}</p>
              <p className="dark:text-zinc-300">{lead?.email}</p>
            </div>
          </div>

          <div className="h-full gap-3 flex flex-col dark:text-zinc-300 mb-5">
            <div className="flex flex-col gap-5 sm:gap-3 sm:flex-row sm:justify-between">
              <div className="grow space-y-1">
                <p className="dark:text-zinc-300">Budget</p>
                <p className="uppercase border dark:border-zinc-800 p-4 rounded-md dark:bg-zinc-900 grow shadow">
                  €{lead?.budgetFrom} - €{lead?.budgetTo}
                </p>
              </div>
              <div className="grow space-y-1">
                <p className="dark:text-zinc-300">Property Type</p>
                <p className="uppercase border dark:border-zinc-800 p-4 rounded-md bdark:g-zinc-900 grow shadow">
                  {lead?.propertyType}
                </p>
              </div>
              <div className="grow space-y-1">
                <p className="dark:text-zinc-300">Area</p>
                <p className="uppercase border dark:border-zinc-800 p-4 rounded-md dark:bg-zinc-900 grow shadow">
                  {lead?.area}
                </p>
              </div>
              <div className="grow space-y-1">
                <p className="dark:text-zinc-300">Beds</p>
                <p className="uppercase border dark:border-zinc-800 p-4 rounded-md dark:bg-zinc-900 grow shadow">
                  {lead?.beds} beds
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-col mb-5">
            <h1 className="text-xl font-medium">Extra Requirements</h1>
            <ReactMarkdown className="border dark:border-zinc-800 rounded-md min-h-20 p-4 dark:bg-zinc-900 shadow">
              {lead?.extra}
            </ReactMarkdown>
          </div>

          <div className="flex gap-3 flex-col mb-5">
            <h1 className="text-xl font-medium">Comments</h1>
            <ReactMarkdown className="border dark:border-zinc-800 rounded-md min-h-20 p-4 dark:bg-zinc-900 shadow">
              {lead?.comment}
            </ReactMarkdown>
          </div>

          <Link href={`/leads/${lead?.id}/suggested`}>
            <Button>Suggested Properties</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LeadDetails;
