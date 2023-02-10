import {
  PostQuestion,
  SortQA,
  UserQuestion,
} from '@features/business-details/components';
import { useBusiness } from '@features/business-details/queries';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Portal, SecondaryButton } from 'src/components';
import { classNames } from 'src/utils/tailwind';

interface QASectionProps {
  className?: string;
}

export default function QASection({ className = '' }: QASectionProps) {
  const [qaDialogOpen, setQADialogOpen] = useState(false);

  const result = useBusiness();
  const businessData = result.data;

  if (!businessData) return <></>;

  return (
    <div className={classNames(className)}>
      <Portal selector="#ask-question-button">
        <SecondaryButton
          className="px-6 py-2 sm:py-[10px]"
          onClick={() => setQADialogOpen(true)}
        >
          Ask Question
        </SecondaryButton>
      </Portal>
      <div className="mb-7 flex flex-wrap-reverse items-center justify-between gap-y-5 gap-x-2">
        <SortQA />
        <div className="relative mr-[2px] flex w-max items-center">
          <input
            type="text"
            className="rounded-[4px] border border-gray-500 px-5 py-[9px]"
            placeholder="Search for questions"
          />
          <AiOutlineSearch className="absolute right-4 shrink-0" size={20} />
        </div>
      </div>
      <div
        className={classNames(
          qaDialogOpen ? 'mb-5' : 'mb-12',
          'border-b border-gray-300'
        )}
      />
      {qaDialogOpen && (
        <PostQuestion closeDialog={() => setQADialogOpen(false)} />
      )}
      <UserQuestion />
    </div>
  );
}
