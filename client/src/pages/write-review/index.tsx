import { MainHeading, Searchbar } from '@features/home-page/components';
import { ReviewCards } from '@features/write-review/components';
import Head from 'next/head';
import { NavigationProvider } from 'src/components/context-provider';
import { AppLayout } from 'src/components/layout';
import { Navbar, Sidebar } from 'src/components/navigation';
import { NextPageWithLayout } from 'src/pages/_app';

const WriteReview: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Kata | Find top reviews</title>
        <meta
          property="og:title"
          content="Kata, Find top reviews"
          key="Reviews"
        />
      </Head>
      <main className="mt-10">
        {/* BG Image */}
        {/* <div className="overlay absolute inset-0 z-10 h-[500px] bg-gray-500 sm:h-[640px]" /> */}
        <div className="absolute inset-0 -z-10 hidden h-[700px] bg-review-landing-img bg-cover md:block" />
        <div className="mb-7 flex h-[350px] flex-col items-start justify-between overflow-hidden md:h-[600px] lg:flex-row">
          <div className="sm:mb-5 lg:mt-10 lg:mb-0">
            <MainHeading className="mb-5 max-w-sm sm:max-w-xl md:mb-7">
              Review and rate your favourite businesses
            </MainHeading>
            <span className="mb-8 inline-block text-xl text-gray-500 md:text-gray-200">
              Search for a business in order to create a review
            </span>
            <div className="pl-1">
              <Searchbar />
            </div>
          </div>
        </div>
        <div className="mx-auto mb-9 text-center md:mb-11">
          <h4 className="text-xl font-medium md:text-2xl">Trending Reviews</h4>
          <span className="inline-block text-gray-500">
            Checkout what people have been writing
          </span>
        </div>
        <ReviewCards />
      </main>
    </>
  );
};

WriteReview.getLayout = (page) => (
  <>
    <AppLayout size="sm">
      <NavigationProvider>
        <Navbar theme="dark" />
        <Sidebar />
      </NavigationProvider>
      {page}
    </AppLayout>
  </>
);

export default WriteReview;
