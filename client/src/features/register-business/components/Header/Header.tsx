import { Divider } from 'src/components';
import { classNames } from 'src/utils/tailwind';
import { formContent } from '../../layouts/FormContainer';

interface HeaderProps {
  step: number;
  className?: string;
}

export default function Header({ step, className = '' }: HeaderProps) {
  const formItem = formContent.find((item) => item.id === step);
  if (!formItem) return <></>;

  return (
    <div
      className={classNames(
        className,
        'sticky top-0 z-20 bg-white pt-7 md:pt-10'
      )}
    >
      <h2 className="mb-3 text-2xl font-medium capitalize sm:text-3xl">
        {formItem.name}
      </h2>
      <p className="mb-7 text-gray-600 md:mb-10">{formItem.description}</p>
      <div className="relative ml-[50%] h-1 w-[100vw] -translate-x-[50%]">
        <Divider
          width={3}
          className="absolute left-0 z-20 w-1/4 border-primaryred"
        />
        <Divider width={3} className="absolute left-0 right-0" />
      </div>
    </div>
  );
}
