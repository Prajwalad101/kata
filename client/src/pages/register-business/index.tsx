import { Navbar } from '@features/register-business/components';
import { infoCardData } from '@features/register-business/data';
import { HeroSection } from '@features/register-business/layouts';
import { EllipsisSeperator, InfoCard } from '@features/register-business/ui';
import React from 'react';
import { NavigationProvider } from 'src/components/context-provider';
import AppLayout from 'src/components/layout/app/AppLayout';
import { NextPageWithLayout } from '../_app';

const CreateBusiness: NextPageWithLayout = () => {
  return (
    <div>
      <HeroSection />
      <div className="md:my-20">
        {infoCardData.map((data, index) => (
          <React.Fragment key={index}>
            <InfoCard {...data} flip={index % 2 ? true : false} key={index} />
            <EllipsisSeperator />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

CreateBusiness.getLayout = (page) => (
  <AppLayout size="sm">
    <NavigationProvider>
      <div className="mb-7 md:mb-10">
        <Navbar theme="dark" />
      </div>
      {page}
    </NavigationProvider>
  </AppLayout>
);

export default CreateBusiness;
