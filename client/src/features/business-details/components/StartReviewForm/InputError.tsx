import { ReactNode } from 'react';
import { classNames } from 'src/utils/tailwind';

interface InputErrorProps {
  className?: string;
  children: ReactNode;
}

export default function InputError({
  className = '',
  children,
}: InputErrorProps) {
  return (
    <p role="alert" className={classNames(className, 'text-sm text-red-600')}>
      {children}
    </p>
  );
}
