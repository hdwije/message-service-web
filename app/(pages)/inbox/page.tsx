'use client';

import { useGetMessages } from '@/app/actions/sms/queries';
import { PrimaryButton, Title } from '@/app/components/common';
import { Alert, Spinner } from '@heroui/react';
import { useMemo } from 'react';

export default function InboxPage() {
  const { data: messages, isLoading } = useGetMessages();

  const messageList = useMemo(() => {
    if (!messages) {
      return <Alert color="primary" title="Inbox is empty" />;
    }

    return messages.map((message, index) => {
      return (
        <div
          key={index}
          className="flex items-center justify-between rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-4 shadow-lg"
        >
          <div>
            <h2 className="text-lg font-bold text-indigo-900">{message.to}</h2>
            <p className="text-gray-600">{message.sid}</p>
          </div>
          <PrimaryButton className="bg-indigo-500 font-semibold text-white transition hover:bg-indigo-600">
            View
          </PrimaryButton>
        </div>
      );
    });
  }, [messages]);

  return (
    <>
      <Title name="Create Message" />
      <div className="mt-4 flex justify-center p-3">
        {isLoading ? (
          <Spinner size="md" color="current" className="mt-5" />
        ) : (
          <div className="flex w-full flex-col gap-2">{messageList}</div>
        )}
      </div>
    </>
  );
}
