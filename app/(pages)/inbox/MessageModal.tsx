'use client';

import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { format } from 'date-fns';
import { Dispatch, SetStateAction, useCallback } from 'react';

interface MessageModalProps {
  to: string;
  id: string;
  body: string;
  sentDate: Date;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export function MessageModal({
  body,
  id,
  to,
  sentDate,
  showModal,
  setShowModal,
}: MessageModalProps) {
  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      setShowModal(isOpen);
    },
    [setShowModal],
  );

  if (!showModal) return null;

  return (
    <Modal isOpen={showModal} onOpenChange={onOpenChange}>
      <ModalContent className="mx-auto max-w-md overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <>
          <ModalHeader className="flex flex-col gap-1 bg-indigo-200 px-6 py-4 text-xl font-bold text-indigo-900">
            Message
          </ModalHeader>
          <ModalBody className="flex flex-col gap-4 rounded-b-2xl bg-white p-6">
            <div className="flex flex-col gap-2">
              <div className="font-semibold text-indigo-800">
                <span className="font-bold">To: </span>
                {to}
              </div>
              <div className="font-semibold text-indigo-800">
                <span className="font-bold">ID: </span>
                {id}
              </div>
              <div className="font-semibold text-indigo-800">
                <span className="font-bold">Date Sent: </span>
                {format(sentDate, 'yyyy/MM/dd HH:mm')}
              </div>
              <div className="text-gray-700">
                <span className="font-bold text-indigo-800">Message: </span>
                {body}
              </div>
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
