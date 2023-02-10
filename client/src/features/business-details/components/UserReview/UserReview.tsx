import { IReview } from '@destiny/common/types';
import {
  ReportUserDropdown,
  ReviewText,
} from '@features/business-details/components';
import Image from 'next/image';
import { BiHeart, BiLike } from 'react-icons/bi';
import RatingIcons from 'src/components/icons/ratings/RatingIcons';
import { getRelativeDate } from 'src/utils/date';

const images = [
  'https://dummyimage.com/300.png/09f/fff&text=1',
  'https://dummyimage.com/300.png/09f/fff&text=2',
  'https://dummyimage.com/300.png/09f/fff&text=3',
  'https://dummyimage.com/300.png/09f/fff&text=4',
  'https://dummyimage.com/300.png/09f/fff&text=5',
  'https://dummyimage.com/300.png/09f/fff&text=6',
  'https://dummyimage.com/300.png/09f/fff&text=7',
  'https://dummyimage.com/300.png/09f/fff&text=8',
  'https://dummyimage.com/300.png/09f/fff&text=9',
];

const userProfileImg =
  'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';

interface UserReviewProps {
  review: IReview;
}

export default function UserReview({ review }: UserReviewProps) {
  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="mb-4 flex items-center gap-5">
          <div className="h-[50px] w-[50px] shrink-0">
            <Image
              className="rounded-full"
              src={userProfileImg}
              alt="user-profile"
              width={50}
              height={50}
              objectFit="cover"
            />
          </div>
          <div>
            <p className="pb-1 font-medium capitalize">sagar thapa</p>
            <div className="flex flex-wrap items-center gap-x-4">
              <p className="text-gray-600">8 reviews</p>
              <Seperator />
              <p className="text-gray-600">35 cp</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <ReportUserDropdown />
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
      <ReviewText reviewText={review.review} className="mb-8" />
      <div className="mb-8 flex gap-3 overflow-scroll">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className="relative h-[140px] w-[min(50%-12px,240px)] shrink-0"
            >
              <Image
                key={index}
                src={image}
                alt="review-image"
                layout="fill"
                objectFit="cover"
                className="rounded-sm"
              />
            </div>
          );
        })}
      </div>

      {/* <p className="mb-5 leading-7 w-2/3">{review.review}</p> */}
      <Feedback likes={review.likes} />
      <div className="border border-gray-300" />
    </div>
  );
}

function Feedback({ likes }: { likes: number }) {
  return (
    <div className="mb-5 flex items-center gap-12">
      <div className="flex flex-col items-center gap-1">
        <BiLike
          size={24}
          className="cursor-pointer transition-colors hover:text-blue-500"
        />
        <p className="text-gray-700">{likes}</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <BiHeart
          size={24}
          className="cursor-pointer transition-colors hover:text-primaryred"
        />
        <p className="text-gray-700">8</p>
      </div>
    </div>
  );
}

function Seperator() {
  return <div className="h-[5px] w-[5px] shrink-0 rounded-full bg-gray-600" />;
}
