import useMostLikedReviews from '@features/write-review/api/useMostLikedReviews';
import ReviewCardSkeleton from '@features/write-review/ReviewCardSkeleton/ReviewCardSkeleton';
import ReviewCard from '../ReviewCard/ReviewCard';

export default function ReviewCards() {
  const { data, isLoading, isSuccess } = useMostLikedReviews();

  return (
    <div className="grid grid-cols-3 gap-y-10">
      {isLoading && <ReviewCardSkeleton />}
      {isSuccess &&
        data.map((review, key) => <ReviewCard review={review} key={key} />)}
    </div>
  );
}
