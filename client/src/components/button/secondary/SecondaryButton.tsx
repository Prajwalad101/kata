import { ForwardedRef, forwardRef } from 'react';
import { ButtonProps as Button } from 'src/types/props';
import { classNames } from 'src/utils/tailwind';

interface SecondaryButtonProps {
  theme?: 'light' | 'dark';
  type?: 'button' | 'submit' | 'reset';
}

type ButtonProps = Button & SecondaryButtonProps;

const SecondaryButton = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { className, theme, children, ...customProps } = props;

    return (
      <button
        className={classNames(
          theme === 'dark'
            ? 'border-white text-white'
            : 'border-gray-700 hover:text-white',
          'md rounded-md border-[1px] bg-transparent text-base transition-colors hover:border-primaryred hover:bg-primaryred',
          className || ''
        )}
        ref={ref}
        {...customProps}
      >
        {children}
      </button>
    );
  }
);

SecondaryButton.displayName = 'SecondaryButton';

export default SecondaryButton;
