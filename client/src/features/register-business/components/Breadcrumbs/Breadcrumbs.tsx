import { classNames } from 'src/utils/tailwind';
import { formContent } from '../../layouts/FormContainer';

interface BreadCrumbsProps {
  step: number;
  onClick: (_step: number) => void;
  className?: string;
}

export default function Breadcrumbs({
  step,
  onClick,
  className = '',
}: BreadCrumbsProps) {
  return (
    <div
      className={classNames(
        className,
        'mb-6 hidden justify-between gap-7 xs:flex'
      )}
    >
      {formContent.map((formItem, index) => (
        <button
          onClick={() => onClick(formItem.id)}
          key={index}
          className="flex items-center gap-4 text-gray-600 transition-colors hover:text-gray-800"
        >
          <div
            className={classNames(
              step === formItem.id ? 'bg-red-500' : 'bg-gray-300',
              'hidden h-4 w-4 shrink-0 rounded-full sm:block'
            )}
          />
          <p className="capitalize ">{formItem.name}</p>
        </button>
      ))}
    </div>
  );
}
