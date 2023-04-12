import useHighestRatedBusiness from '@features/home-page/api/useHighestRatedBusiness';
import useNearestBusiness from '@features/home-page/api/useNearestBusinesses';
import useTrendingBusiness from '@features/home-page/api/useTrendingBusiness';
import {
  CategoriesDropdown,
  MainHeading,
  Searchbar,
} from '@features/home-page/components';
import ChooseCategory from '@features/home-page/components/ChooseCategory/ChooseCategory';
import { RecommendedSection } from '@features/recommended-business/layouts';
import Head from 'next/head';
import { Divider } from 'src/components';
import { NavigationProvider } from 'src/components/context-provider/NavigationProvider/NavigationProvider';
import { AppLayout } from 'src/components/layout';
import { Navbar } from 'src/components/navigation';
import { useLocation } from 'src/layouts/LocationProvider';
import { NextPageWithLayout } from 'src/pages/_app';

const Home: NextPageWithLayout = () => {
  const coordinates = useLocation();

  const trendingBusinessQuery = useTrendingBusiness();
  const nearestBusinessQuery = useNearestBusiness(coordinates);
  const highestRatedBusinessQuery = useHighestRatedBusiness(coordinates);

  return (
    <div>
      <Head>
        <title>Kata | Find and support local businesses</title>
        <meta
          property="og:title"
          content="Kata, Find and support local businesses"
          key="Homepage"
        />
      </Head>
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
      <Divider className="mt-4" />
      {coordinates && (
        <RecommendedSection
          title="Near to you"
          description="Explore local businesses near to your location"
          data={nearestBusinessQuery.data}
          isLoading={nearestBusinessQuery.isLoading}
        />
      )}
      <Divider className="mt-4" />
      {coordinates && (
        <RecommendedSection
          title="Highest rated"
          description="Find the best rated businesses near to you"
          data={highestRatedBusinessQuery.data}
          isLoading={highestRatedBusinessQuery.isLoading}
        />
      )}
      <Divider className="mt-4 mb-8" />
      <ChooseCategory />
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
