import { PrimaryButton, SecondaryButton } from 'src/components';

interface ButtonsProps {
  onCancel: () => void;
  isLoading: boolean;
}

export default function Buttons({ onCancel, isLoading }: ButtonsProps) {
  return (
    <div className="flex flex-wrap items-start justify-end gap-4">
      <SecondaryButton
        disabled={isLoading}
        type="button"
        className="h-[45px] w-[120px]"
        onClick={onCancel}
      >
        Cancel
      </SecondaryButton>
      <PrimaryButton
        isLoading={isLoading}
        type="submit"
        className="h-[45px] w-[120px]"
      >
        Post
      </PrimaryButton>
    </div>
  );
}
