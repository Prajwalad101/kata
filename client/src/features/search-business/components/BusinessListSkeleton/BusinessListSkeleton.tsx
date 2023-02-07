interface BusinessListSkeletonProps {
  count?: number;
}

export default function BusinessListSkeleton({
  count = 4,
}: BusinessListSkeletonProps) {
  const countArr = Array.from(Array(count).keys());
  console.log(countArr);

  return (
    <div>
      {countArr.map((_, index) => (
        <div key={index}>
          <SkeletonItem />
        </div>
      ))}
    </div>
  );
}

function SkeletonItem() {
  return (
    <div className="mb-4 flex h-48 w-full animate-pulse gap-4 rounded-md bg-slate-200">
      <div className="h-full w-[224px] animate-pulse bg-slate-300"></div>
      <div className="flex grow flex-col justify-between py-7">
        <div>
          <div className="mb-5 h-6 w-full max-w-sm rounded-lg bg-slate-300"></div>
          <div className="h-5 w-full max-w-[200px] rounded-lg bg-slate-300"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 animate-pulse rounded-full bg-slate-300"></div>
          <div className="h-6 w-6 animate-pulse rounded-full bg-slate-300"></div>
          <div className="h-6 w-6 animate-pulse rounded-full bg-slate-300"></div>
          <div className="h-6 w-6 animate-pulse rounded-full bg-slate-300"></div>
          <div className="h-6 w-6 animate-pulse rounded-full bg-slate-300"></div>
        </div>
      </div>
    </div>
  );
}
