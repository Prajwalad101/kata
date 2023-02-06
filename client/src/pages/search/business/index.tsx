import { SearchFilter, SortItems } from '@features/search-business/components';
import {
  searchFilterOptions,
  sortItemData,
} from '@features/search-business/data';
import { useBusinesses } from '@features/search-business/hooks';
import { fetchBusinesses } from '@features/search-business/hooks/useBusinesses';
import { SearchBusinessSection } from '@features/search-business/layouts';
import { FilterFields } from '@features/search-business/types';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { NavigationProvider } from 'src/components/context-provider';
import { AppLayout } from 'src/components/layout';
import { Navbar, Sidebar } from 'src/components/navigation';
import { NextPageWithLayout } from 'src/pages/_app';
import { isString } from 'src/utils/text';

const SearchBusiness: NextPageWithLayout = () => {
  const [_isEnabled, setIsEnabled] = useState(true);
  const [selectedSort, setSelectedSort] = useState(sortItemData[0]);
  const [selectedFilters, setSelectedFilters] = useState<FilterFields>({
    features: [],
  });

  const sort = selectedSort.sortField;

  const businessResult = useBusinesses({
    sort,
    filters: selectedFilters,
  });

  // when fetch settles, change the filter state back to false
  useEffect(() => {
    setIsEnabled(false);
  }, [businessResult]);

  const filterComponent = (
    <SearchFilter
      //! Temporary Fix: This can lead to run time error
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      filterBy={searchFilterOptions.resturant!}
      selectedFilters={selectedFilters}
      setSelectedFilters={setSelectedFilters}
      setIsEnabled={setIsEnabled}
    />
  );

  const sortComponent = (
    <SortItems
      {...{ sortItemData, selectedSort, setSelectedSort, setIsEnabled }}
    />
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
