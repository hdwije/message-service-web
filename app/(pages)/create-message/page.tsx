'use client';

import { Input, PrimaryButton, Textarea, Title } from '@/app/components/common';
import { Form } from '@heroui/react';
import { useCallback } from 'react';

export default function Dashboard() {
  const onSubmit = useCallback(() => {}, []);

  const onChange = useCallback(() => {}, []);

  return (
    <>
      <Title name="Create Message" />
      <div className="mt-4 flex w-full flex-col items-center">
        <Form className="max-w-md space-y-4" onSubmit={onSubmit}>
          <div className="flex flex-row items-center justify-center">
            <label
              htmlFor="recipient"
              className="w-32 items-center text-sm font-medium text-gray-700"
            >
              Recipient
            </label>
            <Input
              id="recipient"
              name="recipient"
              type="tel"
              placeholder="Enter phone number"
              onChange={onChange}
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="message"
              className="w-32 text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              onChange={onChange}
            />
          </div>
          <div className="flex w-full justify-end">
            <PrimaryButton type="submit" color="primary">
              Submit
            </PrimaryButton>
          </div>
        </Form>
      </div>
    </>
  );
}
