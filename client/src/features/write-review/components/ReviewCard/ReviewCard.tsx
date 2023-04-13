import { IReview } from '@destiny/common/types';
import Image from 'next/image';
import RatingIcons from 'src/components/icons/ratings/RatingIcons';
import Slider from 'src/components/slider/Slider';
import { getRelativeDate } from 'src/utils/date';
import { classNames } from 'src/utils/tailwind';
import { getPublicFilePath } from 'src/utils/text';

interface ReviewCardProps {
  review: IReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const noImage = !review.images || review.images.length === 0;

  return (
    <div
      className={classNames(
        'overflow-hidden text-ellipsis rounded-md bg-gray-100 shadow-md transition-all hover:scale-[101%] hover:shadow-lg sm:w-[350px]',
        noImage ? '' : 'row-span-2'
      )}
    >
      {review.images && review.images.length !== 0 && (
        <Slider numItems={review.images.length} className="h-[250px] w-full">
          {review.images.map((image, index) => (
            <div key={index} className="relative h-full w-full">
              <Image
                src={getPublicFilePath(image)}
                alt="image"
                layout="fill"
                objectFit="cover"
                className="rounded-l-sm"
              />
            </div>
          ))}
        </Slider>
      )}
      <div className={classNames(noImage ? 'px-3 py-6' : 'p-3')}>
        <div className="mb-3 flex justify-between">
          <h3 className="cursor-pointer text-lg font-medium leading-tight decoration-red-400 decoration-2 hover:underline">
            The Burger House
          </h3>
          <div>
            <RatingIcons avgRating={review.rating} />
          </div>
        </div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex cursor-pointer items-center gap-2">
            <div className="h-[25px] shrink-0">
              <Image
                src={review.author.picture}
                alt="user profile image"
                width={25}
                height={25}
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <span className="inline-block text-gray-700">
              {review.author.userName}
            </span>
            {/* <span className="pl-1 inline-block text-gray-700">wrote</span> */}
          </div>
          <span className="inline-block text-sm text-gray-500">
            {getRelativeDate(review.createdAt)}
          </span>
        </div>
        <p
          className={classNames(
            'leading-relaxed',
            noImage ? 'line-clamp-15' : 'line-clamp-5'
          )}
        >
          {review.review}
        </p>
      </div>
    </div>
  );
}
