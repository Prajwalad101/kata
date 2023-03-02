import useNearestBusiness from '@features/home-page/api/useNearestBusinesses';
import useTrendingBusiness from '@features/home-page/api/useTrendingBusiness';
import {
  CategoriesDropdown,
  MainHeading,
  Searchbar,
} from '@features/home-page/components';
import { RecommendedSection } from '@features/recommended-business/layouts';
import { getUserCoordinates } from '@features/register-business/utils/api';
import { useEffect, useState } from 'react';
import { NavigationProvider } from 'src/components/context-provider/NavigationProvider/NavigationProvider';
import { AppLayout } from 'src/components/layout';
import { Navbar } from 'src/components/navigation';
import { NextPageWithLayout } from 'src/pages/_app';

const Home: NextPageWithLayout = () => {
  const [userCoordinates, setUserCoordinates] = useState<[number, number]>();

  const trendingBusinessQuery = useTrendingBusiness();
  const nearestBusinessQuery = useNearestBusiness(userCoordinates);

  useEffect(() => {
    getUserCoordinates().then((value) => setUserCoordinates(value));
  }, []);

  return (
    <div>
      <div className="mb-10 md:mb-0 md:h-[550px]">
        <div className="absolute inset-0 -z-10 hidden h-[700px] bg-main-img bg-cover bg-no-repeat md:block" />

        <section className="mt-7 md:mt-20">
          <MainHeading className="mb-5 max-w-sm sm:max-w-xl md:mb-7">
            Find and support local businesses
          </MainHeading>
          <Searchbar />
          <CategoriesDropdown />
        </section>
      </div>
      <RecommendedSection
        title="Trending right now"
        description="Take a look at some of the hottest places to explore"
        data={trendingBusinessQuery.data}
        isLoading={trendingBusinessQuery.isLoading}
      />
      {userCoordinates && (
        <RecommendedSection
          title="Near to you"
          description="Explore local businesses near to your location"
          data={nearestBusinessQuery.data}
          isLoading={nearestBusinessQuery.isLoading}
        />
      )}
    </div>
  );
};

// since navbar should render with background image, it is present inside the hero section
Home.getLayout = (page) => (
  <AppLayout size="sm">
    <NavigationProvider>
      <Navbar theme="dark" />
    </NavigationProvider>
    {page}
  </AppLayout>
);

export default Home;
