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

const statuses = ["ACTIVE", "INACTIVE", "CLOSED"];

const StatusSelect: React.FC<Props> = ({ id, status, className }) => {
  const router = useRouter();

  return (
    <Select
      defaultValue={status}
      onValueChange={async (value) => {
        await axios
          .patch(`/api/leads/${id}`, { status: value })
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
        className={`w-full dark:bg-zinc-900 dark:border-zinc-800 border dark:text-neutral-50 dark:ring-offset-white dark:focus:ring-zinc-900 ${className} ${
          status === "ACTIVE" &&
          "border border-green-500 text-green-500 dark:border-green-500 dark:text-green-500"
        } ${
          status === "INACTIVE" &&
          "border border-zinc-500 text-zinc-500 dark:border-zinc-500 dark:text-zinc-500"
        } ${
          status === "CLOSED" &&
          "border dark:border-amber-500 dark:text-amber-500 border-amber-500 text-amber-500"
        }`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="dark:bg-zinc-900 dark:text-zinc-50 border dark:border-zinc-800">
        {statuses?.map((status) => (
          <SelectItem
            key={status}
            value={status}
            className="dark:focus:bg-zinc-800 dark:focus:text-zinc-50"
          >
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
