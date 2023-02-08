import { isString } from '@destiny/common/utils';
import {
  BusinessListSkeleton,
  SearchFilter,
  SortItems,
} from '@features/search-business/components';
import { sortItemData } from '@features/search-business/data';
import { useFetchBusinesses } from '@features/search-business/hooks';
import { fetchBusinesses } from '@features/search-business/hooks/useFetchBusinesses';
import {
  BusinessList,
  SearchBusinessSection,
} from '@features/search-business/layouts';
import { GetServerSideProps } from 'next';
import { memo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { dehydrate, QueryClient } from 'react-query';
import { PrimaryButton } from 'src/components';
import { NavigationProvider } from 'src/components/context-provider';
import { AppLayout } from 'src/components/layout';
import { Navbar, Sidebar } from 'src/components/navigation';
import { NextPageWithLayout } from 'src/pages/_app';

const SearchBusiness: NextPageWithLayout = () => {
  const [selectedSort, setSelectedSort] = useState(sortItemData[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const { ref, inView } = useInView();

  const sort = selectedSort.sortField;

  const {
    data,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchBusinesses({
    sort,
    features: selectedFeatures,
  });

  // useEffect(() => {
  //   if (inView) {
  //     fetchNextPage();
  //   }
  // });

  const filterComponent = (
    <SearchFilter
      selectedFeatures={selectedFeatures}
      setSelectedFeatures={setSelectedFeatures}
    />
  );

  const sortComponent = (
    <SortItems {...{ sortItemData, selectedSort, setSelectedSort }} />
  );

  return (
    <>
      <SearchBusinessSection
        filterComponent={filterComponent}
        sortComponent={sortComponent}
      >
        <>
          {isLoading && <BusinessListSkeleton />}
          {isSuccess &&
            data.pages.map(({ page, data }) => (
              <MemoBusinessList key={page} businessData={data} />
            ))}
        </>
      </SearchBusinessSection>
      <div className="mb-10 mt-5 flex justify-end">
        <PrimaryButton
          ref={ref}
          disabled={!hasNextPage || isFetchingNextPage}
          className="py-2 px-10"
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage
            ? 'Loading more ...'
            : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
        </PrimaryButton>
      </div>
    </>
  );
};

const MemoBusinessList = memo(BusinessList);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const sort = sortItemData[0].sortField;
  const subcategory = context.query.name;

  const params = {
    sort,
    ...(isString(subcategory) && { subcategory }),
  };

  await queryClient.prefetchQuery(
    ['business', sort, subcategory],
    () => fetchBusinesses(params),
    { staleTime: 1000 * 10 }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default SearchBusiness;

SearchBusiness.getLayout = (page) => (
  <AppLayout size="lg">
    <NavigationProvider>
      <Navbar theme="light" />
      <Sidebar />
    </NavigationProvider>
    {page}
  </AppLayout>
);
