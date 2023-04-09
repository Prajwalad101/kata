import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { classNames } from 'src/utils/tailwind';

interface IRatingIcons {
  avgRating: number;
  size?: number;
  className?: string;
}

function RatingIcons({ className = '', avgRating, size = 17 }: IRatingIcons) {
  console.log('AVGRATING', avgRating);
  // if totalRatings or ratingCount is 0, render empty stars
  const emptyArr = Array.from(Array(5).keys());

  if (avgRating === 0) {
    return (
      <div className={classNames('flex text-primaryred', className)}>
        {emptyArr.map((item) => (
          <BsStar size={size} key={item} />
        ))}
      </div>
    );
  }
  // to check for a half star
  const isDecimal = !Number.isInteger(avgRating);

  // to calculate the number of full stars
  const fullRating = Math.floor(avgRating);
  const ratingsArr = Array.from(Array(fullRating).keys());

  // to calculate remaining stars
  const totalStars = 5;

  // decrease total stars from each star
  let remaining = totalStars - ratingsArr.length;
  if (isDecimal) {
    remaining--;
  }

  let remainingArr: number[] = [];
  if (remaining !== 0) {
    remainingArr = Array.from(Array(remaining).keys());
  }

  return (
    <div
      className={classNames(
        className,
        'flex items-center gap-[3px] text-primaryred'
      )}
    >
      {ratingsArr.map((num) => (
        <BsStarFill key={num} size={size} />
      ))}
      {isDecimal ? <BsStarHalf size={size} /> : null}
      {remainingArr.map((num) => (
        <BsStar key={num} size={size} />
      ))}
    </div>
  );
}

export default RatingIcons;
