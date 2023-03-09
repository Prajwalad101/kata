import { useRouter } from 'next/router';

interface SearchBusinessSectionProps {
  filterComponent: JSX.Element;
  sortComponent: JSX.Element;
  mapComponent: JSX.Element;
  children: JSX.Element;
  // businessResult: UseQueryResult<SearchBusinessResponse, unknown>;
}

function SearchBusinessSection({
  filterComponent,
  sortComponent,
  mapComponent,
  children,
}: // businessResult,
SearchBusinessSectionProps) {
  const router = useRouter();
  const { name, city } = router.query;

  // const { isLoading, isSuccess } = businessResult;

  return (
    <div className="mt-5 flex gap-10 md:mt-10">
      {/* SearchFilter */}
      <div className="w-[380px]">
        <div className="mb-10">{filterComponent}</div>
        <div className="mb-10">{mapComponent}</div>
      </div>
      <div className="min-w-0 grow">
        <div className="mb-7 sm:mr-5 md:mb-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            {/* Heading */}
            <h2 className="font-merriweather text-2xl font-bold">
              Top <span className="capitalize">{name}</span> in{' '}
              <span className="capitalize">{city}</span>
            </h2>
            {/* Sort Items */}
            <div className="w-72">{sortComponent}</div>
          </div>
        </div>
        {/* List of businesses */}
        {children}
      </div>
    </div>
  );
}

export default SearchBusinessSection;
