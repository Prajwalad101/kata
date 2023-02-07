import { isString } from '@destiny/common/utils';
import { SearchFilter, SortItems } from '@features/search-business/components';
import { sortItemData } from '@features/search-business/data';
import { useFetchBusinesses } from '@features/search-business/hooks';
import { fetchBusinesses } from '@features/search-business/hooks/useFetchBusinesses';
import { SearchBusinessSection } from '@features/search-business/layouts';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
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

  console.log(inView);

  const businessResult = useFetchBusinesses({
    sort,
    features: selectedFeatures,
  });

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
        {...{ filterComponent, sortComponent, businessResult }}
      />
      <div className="mb-10 mt-5 flex justify-end">
        <PrimaryButton ref={ref} isLoading className="py-2 px-10">
          Loading More ...
        </PrimaryButton>
      </div>
    </>
  );
};

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
