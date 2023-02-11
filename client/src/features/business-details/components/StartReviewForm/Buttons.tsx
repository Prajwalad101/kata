import { PrimaryButton, SecondaryButton } from 'src/components';
import { classNames } from 'src/utils/tailwind';

interface ButtonsProps {
  onCancel: () => void;
  isLoading: boolean;
}

export default function Buttons({ onCancel, isLoading }: ButtonsProps) {
  return (
    <div className="flex flex-wrap items-start justify-end gap-4">
      <SecondaryButton
        type="button"
        className="h-[45px] w-[120px]"
        onClick={onCancel}
      >
        Cancel
      </SecondaryButton>
      <PrimaryButton
        isLoading={isLoading}
        type="submit"
        className={classNames(
          'h-[45px] w-[120px]',
          isLoading
            ? 'cursor-wait opacity-70 hover:bg-primaryred'
            : 'cursor-default hover:cursor-pointer'
        )}
      >
        Post
      </PrimaryButton>
    </div>
  );
}
