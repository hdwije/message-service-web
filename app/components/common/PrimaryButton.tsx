import { Button as HeroButton, type ButtonProps } from '@heroui/react';

export function PrimaryButton(props: ButtonProps) {
  let classes =
    'rounded-sm bg-indigo-500 font-semibold text-white transition hover:bg-indigo-600';

  if (props.disabled) {
    classes =
      'rounded-sm bg-indigo-500 font-semibold text-white transition bg-gray-300';
  }

  return <HeroButton {...props} className={classes} />;
}
