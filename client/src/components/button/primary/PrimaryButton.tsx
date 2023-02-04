import { ClipLoader } from 'react-spinners';
import { ButtonProps as Button } from 'src/types/props';
import { classNames } from 'src/utils/tailwind';

interface PrimaryButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
}

type ButtonProps = Button & PrimaryButtonProps;

function PrimaryButton({
  children,
  isLoading,
  className = '',
  ...props
}: ButtonProps) {
  if (isLoading) props.disabled = true;

  return (
    <button
      className={classNames(
        className,
        'flex items-center justify-center rounded-md border-[1px] border-primaryred bg-primaryred text-center text-base text-white transition-colors hover:border-red-500 hover:bg-red-500'
      )}
      {...props}
    >
      {isLoading && <ClipLoader size={27} color={'#ffffff'} />}
      {!isLoading && children}
    </button>
  );
}

export default PrimaryButton;
