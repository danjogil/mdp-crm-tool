"use client";

import { Reorder, useMotionValue } from "framer-motion";
import { useRaisedShadow } from "../hooks/useRaisedShadow";

import { Task } from "@prisma/client";

import { FaTrashAlt, FaPen } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  task: Task;
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const router = useRouter();

  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item
      value={task}
      className="border border-zinc-800 rounded-md p-4 bg-zinc-900 flex items-center justify-between gap-3"
      style={{ boxShadow, y }}
    >
      <span className="text-sm sm:text-base">{task?.title}</span>
      <div className="space-x-2">
        <button className="btn btn-circle btn-xs">
          <FaPen />
        </button>
        <button
          className="btn btn-circle btn-xs"
          onClick={async () => {
            await axios
              .delete(`/api/tasks/${task?.id}`)
              .then(() => {
                toast.success("Task deleted!");
                // router.refresh()
                location.reload();
              })
              .catch(() => {
                toast.error("Something went wrong.");
              });
          }}
        >
          <FaTrashAlt />
        </button>
      </div>
    </Reorder.Item>
  );
};

export default TaskItem;
