import RatingIcons from 'src/components/icons/ratings/RatingIcons';
import { classNames } from 'src/utils/tailwind';

const ratings = [
  { name: 'excellent', value: 5, numRatings: 232 },
  { name: 'very good', value: 4, numRatings: 30 },
  { name: 'average', value: 3, numRatings: 50 },
  { name: 'poor', value: 2, numRatings: 18 },
  { name: 'very poor', value: 1, numRatings: 10 },
];

interface RatingsProps {
  avgRating: number;
  numReviews: number;
  className?: string;
  onClick: (_value: number) => void;
}

export default function Ratings({
  avgRating,
  numReviews,
  className = '',
  onClick,
}: RatingsProps) {
  return (
    <div className={classNames(className, 'rounded-md border-gray-300')}>
      <div className="mb-3 flex items-center gap-8">
        <h4 className="text-3xl font-medium">{avgRating.toFixed(1)}</h4>
        <RatingIcons rating={avgRating} size={19} className="gap-[6px]" />
      </div>
      <p className="mb-10 text-gray-500 underline">from {numReviews} reviews</p>
      <div className="flex flex-col gap-3">
        {ratings.map((rating, index) => {
          let percentage = 0;
          if (numReviews <= 0) {
            percentage = 0;
          } else {
            percentage = (rating.numRatings / numReviews) * 100;
          }
          return (
            // <div key={index} className="flex items-center gap-8">
            <div key={index} className="mb-1 items-center xs:flex">
              <div className="mb-1 flex gap-3 xs:mb-0">
                <input
                  type="checkbox"
                  id={rating.name}
                  className="cursor-pointer"
                  onClick={() => onClick(rating.value)}
                />
                <label
                  className="w-[120px] cursor-pointer capitalize"
                  htmlFor={rating.name}
                >
                  {rating.name}
                </label>
              </div>
              <div className="flex grow items-center gap-4">
                <div className="relative h-[10px] w-full rounded-full bg-gray-300">
                  <div
                    className="absolute left-0 top-0 bottom-0 h-full rounded-full bg-primaryred"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                {
                  <p className="w-[50px] text-gray-600">
                    {percentage.toFixed(0)}%
                  </p>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
