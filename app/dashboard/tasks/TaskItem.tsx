"use client";

import { TaskStatus } from "@prisma/client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import EditTaskForm from "./EditTaskForm";

interface Props {
  task: {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
  };
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const router = useRouter();

  return (
    <li className="border border-zinc-800 rounded-md p-4 bg-zinc-900 flex items-center justify-between gap-3">
      <span className="text-sm sm:text-base">{task?.title}</span>
      <div className="space-x-2">
        <button
          className="btn btn-circle btn-xs"
          onClick={() =>
            (
              document.getElementById("my_modal_2") as HTMLDialogElement
            ).showModal()
          }
        >
          <FaPen />
        </button>
        <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-zinc-900 border border-zinc-800">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-zinc-50">
                ✕
              </button>
            </form>
            <EditTaskForm task={task} />
          </div>
        </dialog>
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
