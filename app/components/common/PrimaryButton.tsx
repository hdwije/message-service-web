import { Button as HeroButton, type ButtonProps } from '@heroui/react';

export function PrimaryButton(props: ButtonProps) {
  return <HeroButton {...props} className="rounded-sm bg-[#6366F1]" />;
}
