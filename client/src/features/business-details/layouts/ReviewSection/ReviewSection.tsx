import {
  Ratings,
  SortReview,
  StartReviewForm,
  UserReview,
} from '@features/business-details/components';
import CommunitySearchSkeleton from '@features/business-details/components/ReviewSkeleton/ReviewSkeleton';
import CommunitySectionNotFound from '@features/business-details/components/ReviewsNotFound.ts/ReviewsNotFound';
import CommunitySectionSearch from '@features/business-details/components/SearchReviews/SearchReviews';
import { reviewSortOptions } from '@features/business-details/data';
import { useBusiness, useReviews } from '@features/business-details/queries';
import ErrorMessage from '@destiny/common/data/errorsMessages';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Portal, SecondaryButton } from 'src/components';
import { useAuth } from 'src/layouts/UserProvider';
import { addOrRemove } from 'src/utils/array';
import { classNames } from 'src/utils/tailwind';

interface ReviewSectionProps {
  className?: string;
}

export default function ReviewSection({ className = '' }: ReviewSectionProps) {
  const user = useAuth()?.user;
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Filters for reviews
  const [searchText, setSearchText] = useState<string>();
  const [selectedSort, setSelectedSort] = useState(reviewSortOptions[0]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const businessResult = useBusiness();

  const reviewsResult = useReviews({
    // sort array so that the order in querykey remains same
    ...(selectedRatings.length > 0 && {
      'rating[in]': selectedRatings.sort((a, b) => a - b),
    }),
    ...(searchText && { 'text[search]': searchText }),
    sort: selectedSort.field,
  });

  const openReviewModal = () => {
    if (!user) {
      return toast.error(ErrorMessage.loggedOut);
    }

    if (user._id === business?.owner) {
      return toast.error('You cannot review your own business');
    }
    if (user.blocked) {
      return toast.error(ErrorMessage.suspended);
    }
    setReviewModalOpen(true);
  };

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
            onClick={openReviewModal}
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
          <CommunitySectionSearch
            placeholder="Search for reviews"
            onChange={(text) => setSearchText(text)}
          />
        </div>
        <div className="mb-7 border-b border-gray-300" />
        <Ratings
          ratings={business.ratings}
          avgRating={business.avgRating}
          ratingCount={business.ratingCount}
          className="mb-7"
          onClick={(rating: number) => {
            const ratings = addOrRemove(selectedRatings, rating);
            setSelectedRatings(ratings);
          }}
        />
        <div className="mb-10 border-b border-gray-300" />
        {reviewsResult.isLoading && <CommunitySearchSkeleton items={5} />}
        {reviewsResult.isError && (
          <CommunitySectionNotFound message="Sorry, Could not find any reviews" />
        )}
        {reviewsResult.isSuccess && reviews.length === 0 ? (
          <CommunitySectionNotFound message="Sorry. Could not find any reviews" />
        ) : (
          reviews.map((review) => (
            <UserReview key={review._id.toString()} review={review} />
          ))
        )}
      </div>
    </>
  );
}
