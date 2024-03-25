"use client";

import { MdAdd } from "react-icons/md";
import NewTaskForm from "./NewTaskForm";

const NewTaskModal = () => {
  return (
    <>
      {/* <button
        className="btn btn-sm btn-circle"
        onClick={() =>
          (document.getElementById("my_modal") as HTMLDialogElement).showModal()
        }
      >
        <MdAdd size={20} />
      </button> */}
      <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-zinc-900 border border-zinc-800">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-zinc-50">
              ✕
            </button>
          </form>
          <NewTaskForm />
        </div>
      </dialog>
    </>
  );
};

export default NewTaskModal;
