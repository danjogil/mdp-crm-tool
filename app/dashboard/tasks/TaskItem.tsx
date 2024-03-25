"use client";

import { Task, TaskStatus } from "@prisma/client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import EditTaskForm from "./EditTaskForm";
import EditTaskModal from "./EditTaskModal";

const TaskItem = ({ task }: { task: Task }) => {
  const router = useRouter();

  return (
    <li className="border border-zinc-800 rounded-md p-4 bg-zinc-900 flex items-center justify-between gap-3">
      <span className="text-sm sm:text-base">{task?.title}</span>
      <div className="space-x-2">
        <EditTaskModal task={task} />
        <button
          className="btn btn-circle btn-xs"
          onClick={async () => {
            await axios
              .delete(`/api/tasks/${task?.id}`)
              .then(() => {
                toast.success("Task deleted!");
                router.refresh();
              })
              .catch(() => {
                toast.error("Something went wrong.");
              });
          }}
        >
          <FaTrashAlt />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
