import useMostLikedReviews from '@features/write-review/api/useMostLikedReviews';
import ReviewCardSkeleton from '@features/write-review/ReviewCardSkeleton/ReviewCardSkeleton';
import ReviewCard from '../ReviewCard/ReviewCard';

export default function ReviewCards() {
  const { data, isLoading, isSuccess } = useMostLikedReviews();

  return (
    <div className="grid min-w-0 grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      {isLoading && <ReviewCardSkeleton />}
      {isSuccess &&
        data.map((review, key) => <ReviewCard review={review} key={key} />)}
    </div>
  );
}
