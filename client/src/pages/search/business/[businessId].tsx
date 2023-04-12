import {
  BreadCrumbs,
  BusinessAttributes,
  LocationAndContact,
  Services,
} from '@features/business-details/components';
import {
  BusinessInfoSection,
  CommunitySection,
} from '@features/business-details/layouts';
import { useBusiness } from '@features/business-details/queries';
import { fetchBusiness } from '@features/business-details/queries/useBusiness';
import { CategoriesDropdown } from '@features/home-page/components';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ConditionalRender from 'src/components/conditional-render/ConditionalRender';
import { NavigationProvider } from 'src/components/context-provider';
import { AppLayout } from 'src/components/layout';
import { Navbar, Sidebar } from 'src/components/navigation';
import { NextPageWithLayout } from 'src/pages/_app';

const Business: NextPageWithLayout = () => {
  const businessResult = useBusiness();

  const { data: businessData, isLoading, isError } = businessResult;

  if (!businessData) return <></>;

  return (
    <>
      <Head>
        <title>Kata | {businessData.name}</title>
        <meta
          property="og:title"
          content={`Kata, ${businessData.name}`}
          key="Business page"
        />
      </Head>
      <ConditionalRender isLoading={isLoading} isError={isError}>
        <div className="mb-7">
          <div className="absolute left-0 right-0 border-t-[1px] border-gray-300" />
          <CategoriesDropdown
            className="!gap-12 pt-4 pb-2"
            headingColor="black"
          />
          <div className="absolute left-0 right-0 border-t-[1px] border-gray-300" />
        </div>
        <BreadCrumbs />
        <BusinessInfoSection
          business={businessData}
          className="mt-4 mb-7 md:mb-16"
        />
        <div className="flex flex-col items-start gap-x-16 gap-y-7 md:flex-row-reverse">
          <Services
            businessOwner={businessData.owner.toString()}
            businessId={businessData._id}
            businessEmail={businessData.email}
            businessCoordinates={businessData.location.coordinates}
          />
          <div className="w-full overflow-y-auto">
            <BusinessAttributes
              categoryName={businessData.category}
              features={businessData.features}
            />
            <LocationAndContact
              website={businessData.website}
              location={businessData.location}
              directions={businessData.directions}
              email={businessData.email}
              contactNumber={businessData.contactNumber}
              className="mb-10 md:mb-16"
            />
            <CommunitySection />
          </div>
        </div>
      </ConditionalRender>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;
  const businessId = params?.businessId as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['business', businessId],
    () => fetchBusiness(businessId),
    { staleTime: 1000 * 10 * 10 } // 10 mins
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Business;

Business.getLayout = (page) => (
  <AppLayout size="sm">
    <NavigationProvider>
      <Navbar theme="light" />
      <Sidebar />
    </NavigationProvider>
    {page}
  </AppLayout>
);
