import { Input as HeroInput, type InputProps } from '@heroui/react';

export function Input(props: InputProps) {
  return (
    <HeroInput
      {...props}
      size="md"
      radius="sm"
      className="flex-1"
      variant="bordered"
    />
  );
}
