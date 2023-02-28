import { IReview } from '@destiny/common/types';
import { isString } from '@destiny/common/utils';
import {
  ReportUserDropdown,
  ReviewText,
} from '@features/business-details/components';
import useHandleReviewLikes from '@features/business-details/queries/useHandleReviewLikes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { toast } from 'react-toastify';
import RatingIcons from 'src/components/icons/ratings/RatingIcons';
import { useAuth } from 'src/layouts/UserProvider';
import { getRelativeDate } from 'src/utils/date';
import { classNames } from 'src/utils/tailwind';
import { getPublicFilePath } from 'src/utils/text';

interface UserReviewProps {
  review: IReview;
}

export default function UserReview({ review }: UserReviewProps) {
  const author = review.author;

  return (
    <div className="mb-5">
      <div className="flex items-start justify-between">
        <div className="mb-4 flex items-center gap-5">
          <div className="h-[50px] w-[50px] shrink-0">
            <Image
              className="rounded-full"
              src={author.picture}
              alt="user-profile"
              width={50}
              height={50}
              objectFit="cover"
            />
          </div>
          <div>
            <p className="pb-1 font-medium capitalize">{author.userName}</p>
            <div className="flex flex-wrap items-center gap-x-4">
              <p className="text-gray-600">{author.numReviews} reviews</p>
              <Seperator />
              <p className="text-gray-600">{author.trustPoints} tp</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <ReportUserDropdown userId={author._id} />
          <p className="hidden text-gray-600 xs:block">
            {getRelativeDate(review.createdAt)}
          </p>
        </div>
      </div>
      <p className="mb-2 text-gray-600 xs:hidden">
        {getRelativeDate(review.createdAt)}
      </p>

      <RatingIcons
        rating={review.rating}
        size={20}
        className="mb-4 gap-[5px]"
      />
      <ReviewText reviewText={review.review} className="mb-5" />
      {review.images && review.images.length !== 0 && (
        <div className="my-5 flex gap-3 overflow-scroll">
          {review.images.map((image, index) => {
            return (
              <div
                key={index}
                className="relative h-[140px] w-[min(50%-12px,240px)] shrink-0"
              >
                <Image
                  key={index}
                  src={getPublicFilePath(image)}
                  alt="review-image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            );
          })}
        </div>
      )}

      <Feedback likes={review.likes} reviewId={review._id} />
      <div className="border border-gray-300" />
    </div>
  );
}

interface FeedbackProps {
  reviewId: string;
  likes: { value: number; users: string[] };
}

function Feedback({ likes, reviewId }: FeedbackProps) {
  const user = useAuth()?.user;
  const businessId = useRouter().query.businessId;

  const handleReviewLikesMutation = useHandleReviewLikes();

  const alreadyLiked = user?._id && likes.users.includes(user?._id);

  const handleLike = () => {
    if (!user?._id) {
      return toast.error('You have to be logged in to like this post');
    }

    if (isString(businessId) && isString(user._id))
      handleReviewLikesMutation.mutate({
        businessId,
        userId: user._id,
        reviewId,
        type: alreadyLiked ? 'decrement' : 'increment',
      });
  };

  return (
    <div className="mb-2 flex items-center gap-5">
      <div
        onClick={handleLike}
        className={classNames(
          alreadyLiked ? 'text-blue-600' : '',
          'flex cursor-pointer items-center gap-2 text-gray-700 hover:text-blue-600'
        )}
      >
        {alreadyLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
        <button>Like</button>
      </div>
      <Seperator />
      <p className="text-gray-700">{likes.value} likes</p>
    </div>
  );
}

function Seperator() {
  return <div className="h-[5px] w-[5px] shrink-0 rounded-full bg-gray-600" />;
}
