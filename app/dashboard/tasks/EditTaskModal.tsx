import { Task } from "@prisma/client";
import { FaPen } from "react-icons/fa";
import EditTaskForm from "./EditTaskForm";

const EditTaskModal = async ({ task }: { task: Task }) => {
  return (
    <>
      <button
        className="btn btn-circle btn-xs"
        onClick={() => {
          (
            document.getElementById("my_modal_2") as HTMLDialogElement
          ).showModal();
        }}
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
    </>
  );
};

export default EditTaskModal;
