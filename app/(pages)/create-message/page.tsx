'use client';

import { useSendSms } from '@/app/actions/sms/mutations';
import { Input, PrimaryButton, Textarea, Title } from '@/app/components/common';
import { Alert, Form } from '@heroui/react';
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react';

export default function Dashboard() {
  const [recipient, setRecipient] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);

  const sendSms = useSendSms();

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setSuccessMsg('');
      setErrorMsg('');

      sendSms.mutate(
        { message, recipient },
        {
          onSuccess: (sms) => {
            setSuccessMsg(`SMS sent successfully! Message ID: ${sms.sid}`);
            setRecipient('');
            setMessage('');
            setShowAlert(true);
          },
          onError: (error: Error) => {
            setErrorMsg(error.message);
            setSuccessMsg('');
            setShowAlert(true);
          },
        },
      );
    },
    [message, recipient, sendSms],
  );

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'recipient':
        setRecipient(value);
        break;

      case 'message':
        setMessage(value);
        break;

      default:
        break;
    }
  }, []);

  const alert = useMemo(() => {
    return (
      <Alert
        color={successMsg !== '' ? 'success' : 'danger'}
        description={successMsg !== '' ? successMsg : errorMsg}
        isVisible={showAlert}
        title={successMsg !== '' ? 'Success' : 'Fail'}
        variant="faded"
        onClose={() => setShowAlert(false)}
        className="mb-3"
      />
    );
  }, [errorMsg, showAlert, successMsg]);

  return (
    <>
      <Title name="Create Message" />
      <div className="mt-4 flex w-full flex-col items-center rounded-lg border border-indigo-100 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-3 shadow-sm">
        {alert}
        <Form className="w-1/2 space-y-4" onSubmit={onSubmit}>
          <div className="flex w-full items-center justify-center">
            <label
              htmlFor="recipient"
              className="w-1/3 items-center text-sm font-medium text-indigo-800"
            >
              Recipient
            </label>
            <Input
              id="recipient"
              name="recipient"
              type="tel"
              placeholder="Enter phone number"
              onChange={onChange}
              value={recipient}
            />
          </div>
          <div className="flex w-full items-center">
            <label
              htmlFor="message"
              className="w-1/3 text-sm font-medium text-indigo-800"
            >
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              onChange={onChange}
              value={message}
            />
          </div>
          <div className="flex w-full justify-end">
            <PrimaryButton type="submit" color="primary">
              Send
            </PrimaryButton>
          </div>
        </Form>
      </div>
    </>
  );
}
