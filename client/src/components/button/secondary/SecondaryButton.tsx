import { ButtonProps as Button } from 'src/types/props';
import { classNames } from 'src/utils/tailwind';

interface SecondaryButtonProps {
  theme?: 'light' | 'dark';
  type?: 'button' | 'submit' | 'reset';
}

type ButtonProps = Button & SecondaryButtonProps;

function SecondaryButton({
  children,
  theme = 'light',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        theme === 'dark'
          ? 'border-white text-white'
          : 'border-gray-700 hover:text-white',
        'md rounded-md border-[1px] bg-transparent text-base transition-colors hover:border-primaryred hover:bg-primaryred',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
