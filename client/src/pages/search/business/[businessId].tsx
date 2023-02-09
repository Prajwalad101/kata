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
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import ConditionalRender from 'src/components/conditional-render/ConditionalRender';
import {
  NavigationProvider,
  QueryProvider,
} from 'src/components/context-provider';
import { AppLayout } from 'src/components/layout';
import { Navbar, Sidebar } from 'src/components/navigation';
import { NextPageWithLayout } from 'src/pages/_app';

const Business: NextPageWithLayout = () => {
  const { query } = useRouter();
  const businessId = query.businessId as string;

  const businessResult = useBusiness(businessId);
  const { isLoading, isError } = businessResult;

  const businessData = businessResult.data?.data;
  if (!businessData) return null;

  return (
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
        <Services businessId={businessData._id} />
        <div className="w-full overflow-y-auto">
          <BusinessAttributes attributes={businessData.features} />
          <LocationAndContact className="mb-10 md:mb-16" />
          <CommunitySection className="mb-10" />
        </div>
      </div>
    </ConditionalRender>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;
  const businessId = params?.businessId as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['business', businessId],
    () => fetchBusiness(businessId),
    { staleTime: 1000 * 10 }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Business;

Business.getLayout = (page, pageProps) => (
  <QueryProvider pageProps={pageProps}>
    <AppLayout size="sm">
      <NavigationProvider>
        <Navbar theme="light" />
        <Sidebar />
      </NavigationProvider>
      {page}
    </AppLayout>
  </QueryProvider>
);
