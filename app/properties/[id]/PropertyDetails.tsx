"use client";

import StatusSelect from "@/app/components/StatusSelect";
import { Button } from "@/components/ui/button";
import { Property } from "@prisma/client";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  property: Property | null;
}

const PropertyDetails: React.FC<Props> = ({ property }) => {
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
      className="relative z-20"
    >
      <div className="mt-20 text-white px-4 pb-4 flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mt-3">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              {/* {property?.name} */}
            </h1>
            <div className="flex gap-3">
              <div>
                <Button
                  className="bg-zinc-900 text-zinc-50 border border-zinc-700 hover:bg-zinc-800"
                  onClick={() => router.back()}
                >
                  &larr; Go Back
                </Button>
              </div>
              <Link href={`/properties/${property?.id}/edit`}>
                <Button className="bg-zinc-50 text-zinc-900 hover:bg-zinc-300">
                  Edit lead
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex gap-3 sm:items-center flex-col sm:flex-row sm:justify-between mb-5 border rounded-md p-4 border-zinc-800 bg-zinc-900">
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
              <StatusSelect
                id={property?.id as string}
                status={property?.status as string}
                className="flex sm:hidden max-w-xs"
              />
              <p className="text-zinc-300">
                {/* {format(property?.date as Date, "dd.MM.yyyy")} */}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* <p className="text-zinc-300">{property?.nationality}</p>
              <p className="text-zinc-300">{property?.number}</p>
              <p className="text-zinc-300">{property?.email}</p> */}
            </div>
          </div>

          <h1 className="text-xl font-medium">Requirements</h1>
          <div className="h-full gap-3 flex flex-col text-zinc-300 mb-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <p className="uppercase border border-zinc-800 p-4 rounded-md bg-zinc-900 grow">
                {/* €{property?.budget} */}
              </p>
              <p className="uppercase border border-zinc-800 p-4 rounded-md bg-zinc-900 grow">
                {/* {property?.property} */}
              </p>
              <p className="uppercase border border-zinc-800 p-4 rounded-md bg-zinc-900 grow">
                {/* {property?.area} */}
              </p>
              <p className="uppercase border border-zinc-800 p-4 rounded-md bg-zinc-900 grow">
                {property?.beds} beds
              </p>
            </div>
          </div>

          <div className="flex gap-3 flex-col mb-5">
            <h1 className="text-xl font-medium">Extra Requirements</h1>
            <ReactMarkdown className="border border-zinc-800 rounded-md min-h-20 p-4 bg-zinc-900">
              {/* {property?.extra} */}
            </ReactMarkdown>
          </div>

          <div className="flex gap-3 flex-col">
            <h1 className="text-xl font-medium">Comments</h1>
            <ReactMarkdown className="border border-zinc-800 rounded-md min-h-20 p-4 bg-zinc-900">
              {/* {property?.comment} */}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;
