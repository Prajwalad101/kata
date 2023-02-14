import {
  Ratings,
  ReviewSkeleton,
  SortReview,
  StartReviewForm,
  UserReview,
} from '@features/business-details/components';
import ReviewsNotFound from '@features/business-details/components/ReviewsNotFound.ts/ReviewsNotFound';
import SearchReviews from '@features/business-details/components/SearchReviews/SearchReviews';
import { reviewSortOptions } from '@features/business-details/data';
import { useBusiness, useReviews } from '@features/business-details/queries';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Portal, SecondaryButton } from 'src/components';
import { useUser } from 'src/layouts/UserProvider';
import { addOrRemove } from 'src/utils/array';
import { classNames } from 'src/utils/tailwind';

interface ReviewSectionProps {
  className?: string;
}

export default function ReviewSection({ className = '' }: ReviewSectionProps) {
  const user = useUser();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Filters for reviews
  const [searchText, setSearchText] = useState<string>();
  const [selectedSort, setSelectedSort] = useState(reviewSortOptions[0]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const reviewsResult = useReviews({
    'rating[in]': selectedRatings,
    ...(searchText && { 'text[search]': searchText }),
    sort: selectedSort.field,
  });

  const businessResult = useBusiness();

  const reviews = reviewsResult.data || [];
  const business = businessResult.data;

  if (!business) return <></>;

  return (
    <>
      <StartReviewForm
        isOpen={reviewModalOpen}
        closeModal={() => setReviewModalOpen(false)}
      />
      <div className={classNames(className)}>
        <Portal selector="#start-review-button">
          <SecondaryButton
            className="px-6 py-2 sm:py-[10px]"
            onClick={() => {
              if (!user)
                return toast.error(
                  'You have to be logged in to submit a review.'
                );
              setReviewModalOpen(true);
            }}
          >
            Start Review
          </SecondaryButton>
        </Portal>

        <div className="mb-7 flex flex-wrap-reverse items-center justify-between gap-y-5 gap-x-2">
          <SortReview
            sortOptions={reviewSortOptions}
            selectedSort={selectedSort}
            onSelect={(sortItem) => setSelectedSort(sortItem)}
          />
          <SearchReviews onChange={(text) => setSearchText(text)} />
        </div>
        <div className="mb-7 border-b border-gray-300" />
        <Ratings
          ratings={business.ratings}
          className="mb-7"
          onClick={(rating: number) => {
            const ratings = addOrRemove(selectedRatings, rating);
            setSelectedRatings(ratings);
          }}
        />
        <div className="mb-10 border-b border-gray-300" />
        {reviewsResult.isLoading && <ReviewSkeleton items={5} />}
        {reviewsResult.isError && <ReviewsNotFound />}
        {reviewsResult.isSuccess && reviews.length === 0 ? (
          <ReviewsNotFound />
        ) : (
          reviews.map((review) => (
            <UserReview key={review._id.toString()} review={review} />
          ))
        )}
      </div>
    </>
  );
}
