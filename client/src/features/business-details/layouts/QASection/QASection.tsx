import {
  PostQuestion,
  SortQA,
  UserQuestion,
} from '@features/business-details/components';
import CommunitySearchSkeleton from '@features/business-details/components/ReviewSkeleton/ReviewSkeleton';
import CommunitySectionNotFound from '@features/business-details/components/ReviewsNotFound.ts/ReviewsNotFound';
import CommunitySectionSearch from '@features/business-details/components/SearchReviews/SearchReviews';
import useQuestions from '@features/business-details/queries/useQuestions';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Portal, SecondaryButton } from 'src/components';
import { useAuth } from 'src/layouts/UserProvider';
import { classNames } from 'src/utils/tailwind';

const sortItems = [
  { label: 'most helpful', value: 'likes' },
  { label: 'newest', value: '-createdAt' },
  { label: 'oldest', value: 'createdAt' },
];

interface QASectionProps {
  className?: string;
}

export default function QASection({ className = '' }: QASectionProps) {
  const user = useAuth()?.user;

  const [qaDialogOpen, setQADialogOpen] = useState(false);

  // Filters
  const [selectedSort, setSelectedSort] = useState(sortItems[0].value);
  const [searchText, setSearchText] = useState<string>('');

  const questionsQuery = useQuestions({
    ...(searchText && { 'text[search]': searchText }),
    sort: selectedSort,
  });

  const handleAskQuestion = () => {
    if (!user) {
      return toast.error('You have to be logged in to ask a question');
    }

    if (user.blocked) {
      return toast.error(
        'You have been suspended due to violation of terms and services'
      );
    }
    setQADialogOpen(true);
  };

  return (
    <div className={classNames(className)}>
      <Portal selector="#ask-question-button">
        <SecondaryButton
          className="px-6 py-2 sm:py-[10px]"
          onClick={handleAskQuestion}
        >
          Ask Question
        </SecondaryButton>
      </Portal>
      <div className="mb-7 flex flex-wrap-reverse items-center justify-between gap-y-5 gap-x-2">
        <SortQA
          onSelect={(selected) => setSelectedSort(selected)}
          sortItems={sortItems}
          selectedSort={selectedSort}
        />
        <CommunitySectionSearch
          placeholder="Search for questions"
          onChange={(text) => setSearchText(text)}
        />
      </div>
      <div className={classNames('border-b border-gray-300')} />
      {qaDialogOpen && (
        <PostQuestion closeDialog={() => setQADialogOpen(false)} />
      )}
      {questionsQuery.isLoading && <CommunitySearchSkeleton />}
      {questionsQuery.isError && (
        <CommunitySectionNotFound message="Sorry. Could not find any questions" />
      )}
      {questionsQuery.isSuccess && questionsQuery.data.documentCount === 0 ? (
        <CommunitySectionNotFound message="Sorry. Could not find any questions" />
      ) : (
        questionsQuery.data?.data.map((question) => (
          <UserQuestion data={question} key={question._id.toString()} />
        ))
      )}
    </div>
  );
}
