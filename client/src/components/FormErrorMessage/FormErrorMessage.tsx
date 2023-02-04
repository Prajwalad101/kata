import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { classNames } from 'src/utils/tailwind';

interface FormErrorMessageProps {
  error:
    | FieldError
    | Merge<
        FieldError,
        FieldErrorsImpl<{ package: string; amount: number; month: number }>
      >
    | undefined;
  className?: string;
}

export default function FormErrorMessage({
  error,
  className = '',
}: FormErrorMessageProps) {
  return (
    <>
      {error?.message && (
        <p className={classNames(className, 'text-red-600')}>
          {error?.message}
        </p>
      )}
    </>
  );
}
