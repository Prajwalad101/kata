import {
  CategoriesDropdown,
  MainHeading,
  Searchbar,
} from '@features/home-page/components';
import { RecommendedSection } from '@features/recommended-business/layouts';
import { QueryProvider } from 'src/components/context-provider';
import { NavigationProvider } from 'src/components/context-provider/NavigationProvider/NavigationProvider';
import { AppLayout } from 'src/components/layout';
import { Navbar } from 'src/components/navigation';
import { NextPageWithLayout } from 'src/pages/_app';

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <div className="mb-10 md:mb-0 md:h-[550px]">
        <div className="absolute inset-0 -z-10 hidden h-[700px] bg-main-img bg-cover bg-no-repeat md:block" />

        <section className="mt-7 md:mt-20">
          <MainHeading className="mb-5 max-w-sm sm:max-w-xl md:mb-7">
            Find and support local businesses
          </MainHeading>
          <Searchbar
            placeholder1="Search for stuff"
            placeholder2="Kathmandu, New baneshwor"
            className="h-[60px] max-w-xl rounded-md shadow-md transition-shadow focus-within:shadow-lg md:max-w-2xl"
          />
          <CategoriesDropdown />
        </section>
      </div>
      <div>
        <RecommendedSection
          title="Trending right now"
          description="Take a look at some of the hottest places to explore"
          groupBy="trending"
        />

        <RecommendedSection
          title="Near to you"
          description="Explore local businesses near to your location"
          groupBy="location"
        />
      </div>
    </div>
  );
};

// since navbar should render with background image, it is present inside the hero section
Home.getLayout = (page, pageProps) => (
  <QueryProvider pageProps={pageProps}>
    <AppLayout size="sm">
      <NavigationProvider>
        <Navbar theme="dark" />
      </NavigationProvider>
      {page}
    </AppLayout>
  </QueryProvider>
);

export default Home;
