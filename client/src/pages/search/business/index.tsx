import { isString } from '@destiny/common/utils';
import { SearchFilter, SortItems } from '@features/search-business/components';
import { sortItemData } from '@features/search-business/data';
import { useBusinesses } from '@features/search-business/hooks';
import { fetchBusinesses } from '@features/search-business/hooks/useBusinesses';
import { SearchBusinessSection } from '@features/search-business/layouts';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { NavigationProvider } from 'src/components/context-provider';
import { AppLayout } from 'src/components/layout';
import { Navbar, Sidebar } from 'src/components/navigation';
import { NextPageWithLayout } from 'src/pages/_app';

const SearchBusiness: NextPageWithLayout = () => {
  const [selectedSort, setSelectedSort] = useState(sortItemData[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const sort = selectedSort.sortField;

  const businessResult = useBusinesses({
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
    <SearchBusinessSection
      {...{ filterComponent, sortComponent, businessResult }}
    />
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
