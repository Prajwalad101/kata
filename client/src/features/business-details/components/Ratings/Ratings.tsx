import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import RatingIcons from 'src/components/icons/ratings/RatingIcons';
import { classNames } from 'src/utils/tailwind';

const ratingLabels = ['very poor', 'poor', 'average', 'very good', 'excellent'];

interface RatingsProps {
  ratings: [number, number, number, number, number];
  className?: string;
  onClick: (_value: number) => void;
}

export default function Ratings({
  ratings,
  className = '',
  onClick,
}: RatingsProps) {
  const numRatings = ratings.reduce((acc, current) => acc + current, 0);
  const totalRating = ratings.reduce(
    (acc, current, index) => acc + current * (index + 1),
    0
  );
  const avgRating = totalRating / numRatings;
  const { ref, inView } = useInView();

  const [ratingPercentage, setRatingPercentage] = useState<number[]>([
    0, 0, 0, 0, 0,
  ]);

  // update percentage if in view
  useEffect(() => {
    if (inView) {
      const ratingPercentage = ratings.map((rating) => {
        if (numRatings <= 0) return 0;
        return (rating / numRatings) * 100;
      });
      setRatingPercentage(ratingPercentage);
    } else {
      setRatingPercentage([0, 0, 0, 0, 0]);
    }
  }, [inView, numRatings, ratings]);

  return (
    <div
      ref={ref}
      className={classNames(className, 'rounded-md border-gray-300')}
    >
      <div className="mb-3 flex items-center gap-8">
        <h4 className="text-3xl font-medium">{avgRating.toFixed(1)}</h4>
        <RatingIcons rating={avgRating} size={19} className="gap-[6px]" />
      </div>
      <p className="mb-10 text-gray-500 underline">from {numRatings} reviews</p>
      <div className="flex flex-col gap-3">
        {ratings.map((rating, index) => {
          return (
            <div key={index} className="mb-1 items-center xs:flex">
              <div className="mb-1 flex gap-3 xs:mb-0">
                <input
                  type="checkbox"
                  id={ratingLabels[index]}
                  className="cursor-pointer"
                  onClick={() => onClick(rating)}
                />
                <label
                  className="w-[120px] cursor-pointer capitalize"
                  htmlFor={ratingLabels[index]}
                >
                  {ratingLabels[index]}
                </label>
              </div>
              <div className="flex grow items-center gap-4">
                <div className="relative h-[10px] w-full rounded-full bg-gray-300">
                  <div
                    className={classNames(
                      'absolute left-0 top-0 bottom-0 h-full rounded-full bg-primaryred'
                    )}
                    style={{
                      width: `${ratingPercentage[index]}%`,
                      // only set duration for percentage increase
                      transitionDuration: inView ? '1000ms' : '0ms',
                      transitionProperty: 'all',
                      transitionTimingFunction: 'ease-in-out',
                    }}
                  />
                </div>
                {
                  <p className="w-[50px] text-gray-600">
                    {ratingPercentage[index].toFixed(0)}%
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
