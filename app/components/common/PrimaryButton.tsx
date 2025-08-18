import { Button as HeroButton, type ButtonProps } from '@heroui/react';

export function PrimaryButton(props: ButtonProps) {
  return (
    <HeroButton
      {...props}
      className="rounded-sm bg-indigo-500 font-semibold text-white transition hover:bg-indigo-600"
    />
  );
}
