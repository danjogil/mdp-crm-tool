import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Task } from "@prisma/client";
import EditTaskForm from "./EditTaskForm";

function EditTaskModal({ task, children }: { task: Task; children: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        className={`cursor-pointer m-[-1rem] p-4 font-light grow ${
          task?.status === "COMPLETE" && "line-through text-green-500"
        }`}
        onClick={onOpen}
      >
        {children}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="p-6 dark:bg-zinc-900 dark:text-zinc-50"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <EditTaskForm task={task} onClose={onClose} />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditTaskModal;
