'use client';

import { Button, Form, Input, Textarea } from '@heroui/react';
import { useCallback } from 'react';

export default function Dashboard() {
  const onSubmit = useCallback(() => {}, []);

  const onChange = useCallback(() => {}, []);

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Input
          isRequired
          errorMessage="Only accept numbers"
          label="Recipient Number"
          labelPlacement="outside-left"
          name="to"
          placeholder="Enter the recipient number"
          type="number"
          onChange={onChange}
        />
        <Textarea
          isDisabled
          className="max-w-xs"
          label="Message"
          labelPlacement="outside-left"
          placeholder="Enter your message"
        />
        <Button color="primary">Send</Button>
      </Form>
    </div>
  );
}
