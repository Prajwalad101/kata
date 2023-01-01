import { ButtonProps as Button } from 'src/types/props';
import { classNames } from 'src/utils/tailwind';

interface PrimaryButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

type ButtonProps = Button & PrimaryButtonProps;

function PrimaryButton({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={classNames(
        className,
        'rounded-md border-[1px] border-primaryred bg-primaryred text-base text-white transition-colors hover:border-red-500 hover:bg-red-500'
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
