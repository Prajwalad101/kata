import { IBusiness } from '@destiny/common/types';

export default function getRatingStats(ratings: IBusiness['ratings']) {
  // total number of ratings on a business
  const numRatings = ratings.reduce((acc, current) => acc + current, 0);

  // sum of all ratings
  const totalRating = ratings.reduce(
    (acc, current, index) => acc + current * (index + 1),
    0
  );

  // average rating of a business
  const avgRating = totalRating / numRatings || 0;

  return { numRatings, totalRating, avgRating } as const;
}
