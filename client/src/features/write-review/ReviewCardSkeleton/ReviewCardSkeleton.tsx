export default function ReviewCardSkeleton() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      {array.map((_, index) => (
        <div key={index} className="rounded-md bg-gray-100 sm:w-[350px]">
          <div className="h-[250px] w-full animate-pulse rounded-md bg-gray-200"></div>
          <div className="px-4 py-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-300"></div>
              <div className="h-4 w-32 animate-pulse rounded-full bg-gray-300"></div>
            </div>
            <div className="mb-4 h-5 w-full animate-pulse rounded-sm bg-gray-300"></div>
            <div className="mb-4 h-5 w-full animate-pulse rounded-sm bg-gray-300"></div>
            <div className="h-5 w-full animate-pulse rounded-sm bg-gray-300"></div>
          </div>
        </div>
      ))}
    </>
  );
}
