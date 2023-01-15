import { ForwardedRef, forwardRef, HTMLProps } from 'react';
import { FieldError } from 'react-hook-form';
import { classNames } from 'src/utils/tailwind';

type MyInputProps = HTMLProps<HTMLInputElement> & { error?: FieldError };

const MyInput = forwardRef(
  (props: MyInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        {...props}
        ref={ref}
        className={classNames(
          props.className || '',
          props.error ? 'ring-red-500' : 'ring-blue-600',
          'w-full rounded-md border-2 border-gray-300 px-4 py-3 outline-none ring-offset-1 transition-all focus:ring-[3px]'
        )}
      />
    );
  }
);

MyInput.displayName = 'MyInput';
export default MyInput;
