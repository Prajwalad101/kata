import { useReviews } from '@features/business-details/queries';
import ReviewCardSkeleton from '@features/write-review/ReviewCardSkeleton/ReviewCardSkeleton';
import { classNames } from 'src/utils/tailwind';
import ReviewCard from '../ReviewCard/ReviewCard';

export default function ReviewCards() {
  const { data, isLoading, isSuccess } = useReviews({ sort: '-createdAt' });

  if (isLoading) return <div>loading ...</div>;

  {
    /* <div className="mb-12 grid min-w-0 grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-14 lg:grid-cols-3"> */
  }

  return (
    <div className="grid grid-cols-3 gap-y-10">
      {isLoading && <ReviewCardSkeleton />}
      {isSuccess &&
        data.map((review, key) => <ReviewCard review={review} key={key} />)}
    </div>
  );
}
