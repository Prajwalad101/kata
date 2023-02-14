import { useState } from 'react';
import { classNames } from 'src/utils/tailwind';
import { truncateText } from 'src/utils/text';

interface ReviewTextProps {
  reviewText: string;
  className?: string;
}

export default function ReviewText({
  reviewText,
  className = '',
}: ReviewTextProps) {
  const [expand, setExpand] = useState(false);
  const isTextLong = reviewText.length >= 100;

  const handleClick = () => {
    if (isTextLong) setExpand(!expand);
  };

  const expandButton = (
    <span
      onClick={handleClick}
      className="ml-3 inline-block underline hover:text-gray-700"
    >
      {expand ? 'Read Less' : 'Read More'}
    </span>
  );

  return (
    <p
      className={classNames(
        isTextLong ? 'cursor-pointer hover:text-gray-800' : '',
        'leading-7',
        className
      )}
      onClick={handleClick}
    >
      {isTextLong ? truncateText(reviewText, 70) : reviewText}
      {isTextLong && expandButton}
    </p>
  );
}
