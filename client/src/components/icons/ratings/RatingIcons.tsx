import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { classNames } from 'src/utils/tailwind';

interface IRatingIcons {
  rating: number;
  size?: number;
  className?: string;
}

function RatingIcons({ className = '', rating, size = 17 }: IRatingIcons) {
  // if totalRatings or ratingCount is 0, render empty stars
  const emptyArr = Array.from(Array(5).keys());

  if (rating === 0) {
    return (
      <div className={classNames('flex text-primaryred', className)}>
        {emptyArr.map((item) => (
          <BsStar size={size} key={item} />
        ))}
      </div>
    );
  }
  // to check for a half star
  const isDecimal = !Number.isInteger(rating);

  // to calculate the number of full stars
  const fullRating = Math.floor(rating);
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
