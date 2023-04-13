import { useReviews } from '@features/business-details/queries';
import ReviewCardSkeleton from '@features/write-review/ReviewCardSkeleton/ReviewCardSkeleton';
import ReviewCard from '../ReviewCard/ReviewCard';

export default function ReviewCards() {
  const { data, isLoading, isSuccess } = useReviews({ sort: '-createdAt' });

  if (isLoading) return <div>loading ...</div>;

  return (
    <div className="grid grid-cols-3 gap-y-10">
      {isLoading && <ReviewCardSkeleton />}
      {isSuccess &&
        data.map((review, key) => <ReviewCard review={review} key={key} />)}
    </div>
  );
}
