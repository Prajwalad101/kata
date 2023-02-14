import { Searchbar } from '@features/home-page/components';
import { ReviewCards } from '@features/write-review/components';
import Image from 'next/image';
import PhoneIllustration from 'public/illustrations/review-business/phone.svg';
import { NavigationProvider } from 'src/components/context-provider';
import { AppLayout } from 'src/components/layout';
import { Navbar, Sidebar } from 'src/components/navigation';
import { NextPageWithLayout } from 'src/pages/_app';

const WriteReview: NextPageWithLayout = () => {
  return (
    <main className="mt-10">
      {/* BG Image */}
      <div className="overlay absolute inset-0 -z-10 h-[500px] bg-gray-100 sm:h-[640px]" />
      <div className="mb-7 flex h-[400px] flex-col items-start justify-between overflow-hidden sm:h-[515px] lg:flex-row">
        <div className="sm:mb-5 lg:mt-10 lg:mb-0">
          <h1 className="mb-4 font-merriweather text-4xl font-bold leading-snug sm:mb-2 md:w-[600px]">
            Review and rate your favourite businesses
          </h1>
          <span className="mb-8 inline-block font-merriweather font-semibold text-gray-500">
            Search for a business in order to create a review
          </span>
          <div className="pl-1">
            <Searchbar />
          </div>
        </div>
        <div className="relative -ml-10 hidden h-[400px] w-[400px] sm:block lg:-ml-0">
          <Image
            src={PhoneIllustration}
            alt="phone illustration"
            layout="fill"
          />
        </div>
      </div>
      <div className="mx-auto mb-9 text-center md:mb-11">
        <h4 className="text-xl font-medium md:text-2xl">Latest Reviews</h4>
        <span className="inline-block text-gray-500">
          Checkout what people have been writing
        </span>
      </div>
      <ReviewCards />
    </main>
  );
};

WriteReview.getLayout = (page) => (
  <>
    <AppLayout size="sm">
      <NavigationProvider>
        <Navbar theme="light" />
        <Sidebar />
      </NavigationProvider>
      {page}
    </AppLayout>
  </>
);

export default WriteReview;
