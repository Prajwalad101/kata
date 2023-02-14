import { ReviewCard } from '@features/write-review/components';

export default function ReviewCards() {
  const items = Array.from(Array(10).keys());

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-14 lg:grid-cols-3">
      {items.map((_, key) => (
        <ReviewCard key={key} />
      ))}
    </div>
  );
}
