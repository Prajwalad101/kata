interface ReviewSkeletonProps {
  items?: number;
  className?: string;
}

export default function ReviewSkeleton({
  items = 3,
  className = '',
}: ReviewSkeletonProps) {
  const cards = Array.from(Array(items).keys());

  return (
    <div className={className}>
      {cards.map((card, i) => (
        <div
          key={i}
          className="animate mb-4 flex flex-col rounded-md bg-gray-200/60 px-6 py-8 xs:mb-6"
        >
          <div className="mb-5 flex items-center gap-5 xs:mb-8">
            <div className="h-10 w-10 shrink-0 rounded-full bg-white xs:h-12 xs:w-12" />
            <div className="h-4 w-28 rounded-xl bg-white xs:block" />
          </div>
          <div className="mb-3 h-4 w-full rounded-sm bg-white xs:mb-5" />
          <div className="mb-3 h-4 w-full rounded-sm bg-white xs:mb-5" />
          <div className="h-4 w-full rounded-sm bg-white" />
        </div>
      ))}
    </div>
  );
}
