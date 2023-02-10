import { isString } from '@destiny/common/utils';
import {
  BusinessListSkeleton,
  SearchFilter,
  SortItems,
} from '@features/search-business/components';
import BusinessNotFound from '@features/search-business/components/BusinessNotFound/BusinessNotFound';
import { sortItemData } from '@features/search-business/data';
import { useFetchBusinesses } from '@features/search-business/hooks';
import { fetchBusinesses } from '@features/search-business/hooks/useFetchBusinesses';
import {
  BusinessList,
  SearchBusinessSection,
} from '@features/search-business/layouts';
import { GetServerSideProps } from 'next';
import { memo, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { dehydrate, QueryClient } from 'react-query';
import { PropagateLoader } from 'react-spinners';
import { NavigationProvider } from 'src/components/context-provider';
import { AppLayout } from 'src/components/layout';
import { Navbar, Sidebar } from 'src/components/navigation';
import { NextPageWithLayout } from 'src/pages/_app';

const SearchBusiness: NextPageWithLayout = () => {
  const [selectedSort, setSelectedSort] = useState<string>(
    sortItemData[0].sortField
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const { ref, inView } = useInView();

  const { data, isLoading, isSuccess, fetchNextPage, isFetchingNextPage } =
    useFetchBusinesses({
      sort: selectedSort,
      features: selectedFeatures,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const filterComponent = (
    <SearchFilter
      selectedFeatures={selectedFeatures}
      setSelectedFeatures={setSelectedFeatures}
    />
  );

  const SortComponent = (
    <SortItems selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
  );

  return (
    <>
      <SearchBusinessSection
        filterComponent={filterComponent}
        sortComponent={SortComponent}
      >
        <>
          {isLoading && <BusinessListSkeleton />}
          {isSuccess && data.pages[0].documentCount === 0 ? (
            <BusinessNotFound />
          ) : (
            data?.pages.map(({ page, data }) => (
              <MemoBusinessList key={page} businessData={data} />
            ))
          )}
          {data?.pages.length === 0 && <div>NOT FOUND</div>}
          <div className="mb-10 flex justify-center">
            <div ref={ref}>
              {isFetchingNextPage && (
                <PropagateLoader speedMultiplier={0.8} color="#F55A5A" />
              )}
            </div>
          </div>
        </>
      </SearchBusinessSection>
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
    { staleTime: 1000 * 10 * 10 } // 10 mins
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
