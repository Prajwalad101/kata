import {
  Ratings,
  ReviewSkeleton,
  SortReview,
  StartReviewForm,
  UserReview,
} from '@features/business-details/components';
import ReviewsNotFound from '@features/business-details/components/ReviewsNotFound.ts/ReviewsNotFound';
import { reviewSortOptions } from '@features/business-details/data';
import { useBusiness, useReviews } from '@features/business-details/queries';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Portal, SecondaryButton } from 'src/components';
import { addOrRemove } from 'src/utils/array';
import { classNames } from 'src/utils/tailwind';

interface ReviewSectionProps {
  className?: string;
}

export default function ReviewSection({ className = '' }: ReviewSectionProps) {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedReviewSort, setSelectedReviewSort] = useState(
    reviewSortOptions[0]
  );
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const { query } = useRouter();
  const businessId = query.businessId as string;

  const reviewsResult = useReviews({
    filters: {
      match: { business: businessId },
      in: { rating: selectedRatings },
    },
    sort: selectedReviewSort.field,
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
            onClick={() => setReviewModalOpen(true)}
          >
            Start Review
          </SecondaryButton>
        </Portal>

        <div className="mb-7 flex flex-wrap-reverse items-center justify-between gap-y-5 gap-x-2">
          <SortReview
            sortOptions={reviewSortOptions}
            selectedSort={selectedReviewSort}
            onSelect={(sortItem) => setSelectedReviewSort(sortItem)}
          />
          {/* Search bar */}
          <div className="relative mr-[2px] flex w-max items-center">
            <input
              type="text"
              className="rounded-[4px] border border-gray-500 px-5 py-[9px]"
              placeholder="Search for reviews"
            />
            <AiOutlineSearch className="absolute right-4 shrink-0" size={20} />
          </div>
        </div>
        <div className="mb-7 border-b border-gray-300" />
        <Ratings
          avgRating={business.avgRating}
          numReviews={business.rating_count}
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
