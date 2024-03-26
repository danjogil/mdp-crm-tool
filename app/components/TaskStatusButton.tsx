"use client";

import { Task } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const TaskStatusButton = ({ task }: { task: Task }) => {
  const router = useRouter();

  const newStatus = task?.status === "INCOMPLETE" ? "COMPLETE" : "INCOMPLETE";

  return (
    <button
      className="btn btn-ghost border-none btn-xs hover:bg-zinc-700"
      onClick={async () => {
        await axios
          .patch(`/api/tasks/${task?.id}`, { status: newStatus })
          .then(() => {
            toast.success("Task status updated!");
            router.refresh();
          })
          .catch(() => {
            toast.error("Something went wrong.");
          });
      }}
    >
      <FaCheck
        className={`${task?.status === "COMPLETE" && "text-green-500"}`}
      />
    </button>
  );
};

export default TaskStatusButton;
