import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { Task } from "@prisma/client";
import NewTaskForm from "./NewTaskForm";
import { ReactNode } from "react";

function NewTaskModal({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button className="cursor-pointer btn btn-circle btn-sm" onClick={onOpen}>
        {children}
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="p-6 bg-zinc-900 text-zinc-50"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <NewTaskForm onClose={onClose} />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewTaskModal;
