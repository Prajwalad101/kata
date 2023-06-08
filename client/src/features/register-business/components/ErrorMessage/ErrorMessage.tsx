import { FieldError } from 'react-hook-form';
import { classNames } from 'src/utils/tailwind';

interface ErrorMessageProps {
  className?: string;
  error: FieldError | undefined;
  validate: FieldError['type'][];
}

export default function ErrorMessage({
  className = '',
  error,
  validate,
}: ErrorMessageProps) {
  if (!error) return <></>;

  return (
    <div className={classNames(className)}>
      <p className="text-red-600">
        {validate.includes(error.type) && error.message}
      </p>
    </div>
  );
}
