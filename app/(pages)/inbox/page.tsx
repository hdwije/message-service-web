'use client';

import { useGetMessages } from '@/app/actions/sms/queries';
import { Sms } from '@/app/common/types';
import { PrimaryButton, Spinner, Title } from '@/app/components/common';
import { Alert } from '@heroui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MessageModal } from './MessageModal';

export default function InboxPage() {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<Sms | undefined>(
    undefined,
  );

  const { data: messages, isLoading } = useGetMessages();

  useEffect(() => {
    if (!showMessageModal) {
      setCurrentMessage(undefined);
    }
  }, [showMessageModal]);

  const viewMessage = useCallback((message: Sms) => {
    setCurrentMessage(message);
    setShowMessageModal(true);
  }, []);

  const messageList = useMemo(() => {
    if (!messages) {
      return <Alert color="primary" title="Inbox is empty" />;
    }

    console.log(messages);

    return (
      messages &&
      messages.map((message, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-4 shadow-lg"
          >
            <div>
              <h2 className="text-lg font-bold text-indigo-900">
                {message.to}
              </h2>
              <p className="text-gray-600">{message.sid}</p>
            </div>
            <PrimaryButton
              className="bg-indigo-500 font-semibold text-white transition hover:bg-indigo-600"
              onPress={() => viewMessage(message)}
            >
              View
            </PrimaryButton>
          </div>
        );
      })
    );
  }, [messages, viewMessage]);

  return (
    <>
      <Title name="Create Message" />
      <div className="mt-4 flex justify-center p-3">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex max-h-[calc(100vh-100px)] w-full flex-col gap-2 overflow-y-auto">
            {messageList}
          </div>
        )}
      </div>
      {currentMessage && (
        <MessageModal
          body={currentMessage.body}
          id={currentMessage.sid}
          setShowModal={setShowMessageModal}
          showModal={showMessageModal}
          to={currentMessage.to}
        />
      )}
    </>
  );
}
