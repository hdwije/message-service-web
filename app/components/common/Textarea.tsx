import { Textarea as HeroTextarea, type TextAreaProps } from '@heroui/react';

export function Textarea(props: TextAreaProps) {
  return (
    <HeroTextarea
      {...props}
      size="md"
      radius="sm"
      className="flex-1"
      variant="bordered"
    />
  );
}
