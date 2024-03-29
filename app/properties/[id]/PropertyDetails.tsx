"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Lead, Property } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import StatusSelect from "@/app/components/StatusSelect";
import { useRouter } from "next/navigation";
import PropertyStatusSelect from "@/app/components/PropertyStatusSelect";

interface Props {
  property: Property | null;
}

const LeadDetails: React.FC<Props> = ({ property }) => {
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
      className="relative z-20 h-screen"
    >
      <div className="pt-20 dark:text-white px-4 pb-4 flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mt-3">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              {property?.propertyType} in {property?.location}
            </h1>
            <div className="flex gap-3">
              <div>
                <Button
                  className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 border dark:border-zinc-800 border-slate-400 hover:bg-slate-100"
                  onClick={() => router.back()}
                >
                  &larr; Go Back
                </Button>
              </div>
              <Link href={`/properties/${property?.id}/edit`}>
                <Button>Edit property</Button>
              </Link>
            </div>
          </div>
          <div className="flex gap-3 sm:items-center flex-col sm:flex-row sm:justify-between mb-5 border rounded-md p-4 dark:border-zinc-800 dark:bg-zinc-900 shadow">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <p
                className={`border rounded-md p-1 px-4 hidden sm:block ${
                  property?.status === "AVAILABLE" &&
                  "border-green-500 text-green-500"
                } ${
                  property?.status === "UNAVAILABLE" &&
                  "border-zinc-500 text-zinc-500"
                } `}
              >
                {property?.status}
              </p>
              <PropertyStatusSelect
                id={property?.id as string}
                status={property?.status as string}
                className="flex sm:hidden max-w-xs"
              />
              <p className="dark:text-zinc-300">
                {format(property?.date as Date, "dd.MM.yyyy")}
              </p>
            </div>
            <div className="flex">
              <p className="dark:text-zinc-300">{property?.type}</p>
            </div>
          </div>

          <div className="h-full gap-3 flex flex-col dark:text-zinc-300 mb-5">
            <div className="flex flex-col gap-5 sm:gap-3 sm:flex-row sm:justify-between">
              <div className="grow space-y-1">
                <p className="dark:text-zinc-300">Price</p>
                <p className="uppercase border dark:border-zinc-800 p-4 rounded-md dark:bg-zinc-900 shadow">
                  €{property?.price}
                </p>
              </div>
              <div className="grow space-y-1">
                <p className="dark:text-zinc-300">Complex Name</p>
                <p className="uppercase border dark:border-zinc-800 p-4 rounded-md dark:bg-zinc-900 shadow">
                  {property?.complexName}
                </p>
              </div>
              <div className="grow space-y-1">
                <p className="dark:text-zinc-300">Property Type</p>
                <p className="uppercase border dark:border-zinc-800 p-4 rounded-md dark:bg-zinc-900 shadow">
                  {property?.propertyType}
                </p>
              </div>
              <div className="grow space-y-1">
                <p className="dark:text-zinc-300">Beds</p>
                <p className="uppercase border dark:border-zinc-800 p-4 rounded-md dark:bg-zinc-900 shadow">
                  {property?.beds} beds
                </p>
              </div>
            </div>
          </div>

          <div className="h-full gap-3 flex flex-col dark:text-zinc-300 mb-5">
            <div className="flex flex-col gap-5 sm:gap-3 sm:flex-row sm:justify-between">
              <div className="grow space-y-1">
                <p className="dark:text-zinc-300">Agent</p>
                <p className="uppercase border dark:border-zinc-800 p-4 rounded-md dark:bg-zinc-900 grow shadow">
                  {property?.agent}
                </p>
              </div>
              <div className="grow space-y-1">
                <p className="dark:text-zinc-300">Conditions</p>
                <p className="uppercase border dark:border-zinc-800 p-4 rounded-md dark:bg-zinc-900 grow shadow">
                  {property?.conditions}
                </p>
              </div>
              <div className="grow space-y-1">
                <p className="dark:text-zinc-300">Reference</p>
                <p className="uppercase border dark:border-zinc-800 p-4 rounded-md dark:bg-zinc-900 grow shadow">
                  {property?.reference}
                </p>
              </div>
            </div>
          </div>

          <div className="h-full gap-3 flex flex-col dark:text-zinc-300 mb-5">
            <div className="flex flex-col gap-5 sm:gap-3 sm:flex-row sm:justify-between">
              <div className="grow space-y-1">
                <p className="dark:text-zinc-300">Property Link</p>
                <p className="uppercase border dark:border-zinc-800 p-4 rounded-md dark:bg-zinc-900 grow shadow">
                  {property?.propertyLink}
                </p>
              </div>
              <div className="grow space-y-1">
                <p className="dark:text-zinc-300">Location Link</p>
                <p className="uppercase border dark:border-zinc-800 p-4 rounded-md dark:bg-zinc-900 grow shadow">
                  {property?.locationLink}
                </p>
              </div>
            </div>
          </div>

          {/* <div className="flex gap-3 flex-col mb-5">
            <h1 className="text-xl font-medium">Extra Requirements</h1>
            <ReactMarkdown className="border border-zinc-800 rounded-md min-h-20 p-4 bg-zinc-900">
              {lead?.extra}
            </ReactMarkdown>
          </div> */}

          <div className="flex gap-3 flex-col">
            <h1 className="text-xl font-medium">Comments</h1>
            <ReactMarkdown className="border dark:border-zinc-800 rounded-md min-h-20 p-4 dark:bg-zinc-900 shadow">
              {property?.comment}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LeadDetails;
