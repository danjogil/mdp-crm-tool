"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

interface Props {
  id: string;
  status: string;
  className: string;
}

const statuses = ["AVAILABLE", "UNAVAILABLE"];

const PropertyStatusSelect: React.FC<Props> = ({ id, status, className }) => {
  const router = useRouter();

  return (
    <Select
      defaultValue={status}
      onValueChange={async (value) => {
        await axios
          .patch(`/api/properties/${id}`, { status: value })
          .then(() => {
            toast.success("Status updated!");
            router.refresh();
          })
          .catch(() => {
            toast.error("Something went wrong.");
          });
      }}
    >
      <SelectTrigger
        className={`w-full bg-inherit text-neutral-50 ring-offset-white focus:ring-zinc-900 ${className} ${
          status === "AVAILABLE" && "border border-green-500 text-green-500"
        } ${
          status === "UNAVAILABLE" && "border border-zinc-500 text-zinc-500"
        }`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-zinc-900 text-zinc-50 border border-zinc-800">
        {statuses?.map((status) => (
          <SelectItem
            key={status}
            value={status}
            className="focus:bg-zinc-800 focus:text-zinc-50"
          >
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PropertyStatusSelect;
