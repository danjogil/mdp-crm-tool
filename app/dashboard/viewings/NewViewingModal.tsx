import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { ReactNode } from "react";
import NewViewingForm from "./NewViewingForm";

function NewViewingModal({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        className="cursor-pointer btn btn-ghost btn-sm dark:hover:bg-zinc-700"
        onClick={onOpen}
      >
        {children}
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="p-6 dark:bg-zinc-900 dark:text-zinc-50"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <NewViewingForm onClose={onClose} />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewViewingModal;
