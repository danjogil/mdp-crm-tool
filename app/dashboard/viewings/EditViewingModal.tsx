"use client";

import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { Viewing } from "@prisma/client";
import EditViewingForm from "./EditViewingForm";

function EditViewingModal({
  viewing,
  children,
}: {
  viewing: Viewing;
  children: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        className={`cursor-pointer m-[-1rem] p-4 font-light grow`}
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
              <EditViewingForm viewing={viewing} onClose={onClose} />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditViewingModal;
