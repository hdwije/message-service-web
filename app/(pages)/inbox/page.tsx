'use client';

import { Sms } from '@/app/common/types';
import { Alert } from '@heroui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PrimaryButton, Spinner, Title } from '@/app/components/common';
import { MessageModal } from './MessageModal';
import { useGetSmsMessages } from '@/app/lib/queries/sms.queries';
import { format } from 'date-fns';

export default function InboxPage() {
  const pageSize = parseInt(
    process.env.NEXT_PUBLIC_MESSAGES_PER_PAGE as string,
  );

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [currentMessage, setCurrentMessage] = useState<Sms | undefined>(
    undefined,
  );

  const getSmsMessages = useGetSmsMessages(pageSize, token);

  const { data: { messages = [], nextPageToken } = {}, isLoading } =
    getSmsMessages;

  useEffect(() => {
    if (!showMessageModal) {
      setCurrentMessage(undefined);
    }
  }, [showMessageModal]);

  const viewMessage = useCallback((message: Sms) => {
    setCurrentMessage(message);
    setShowMessageModal(true);
  }, []);

  const gotoNextPage = useCallback(() => {
    setToken(nextPageToken);
  }, [nextPageToken]);

  const messageList = useMemo(() => {
    if (!messages) {
      return <Alert color="primary" title="Inbox is empty" />;
    }

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
              <p className="text-md text-gray-600">
                {format(message.dateSent, 'yyyy/MM/dd HH:mm')}
              </p>
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
      <Title name="Inbox" />
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
          id={currentMessage.id}
          setShowModal={setShowMessageModal}
          showModal={showMessageModal}
          to={currentMessage.to}
          sentDate={currentMessage.dateSent}
        />
      )}
      <div className="mt-4 flex justify-end p-3">
        <PrimaryButton disabled={!nextPageToken} onPress={gotoNextPage}>
          Next Page
        </PrimaryButton>
      </div>
    </>
  );
}
