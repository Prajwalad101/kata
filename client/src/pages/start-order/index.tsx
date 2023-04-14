import { MenuItem } from '@features/business-details/data/menuData';
import {
  BrowseMenu,
  OrderDetails,
  PaymentForm,
  PersonalDetailsForm,
  PlaceOrder,
} from '@features/order-food/components';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Hamburger from 'public/illustrations/business-details/Hamburger.svg';
import { useState } from 'react';
import { PrimaryButton, SecondaryButton } from 'src/components';
import {
  NavigationProvider,
  QueryProvider,
} from 'src/components/context-provider';
import { AppLayout } from 'src/components/layout';
import { Navbar, Sidebar } from 'src/components/navigation';
import { NextPageWithLayout } from 'src/pages/_app';

export interface IOrderedMenuItem {
  item: MenuItem;
  quantity: number;
}

const StartOrderPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaceOrderOpen, setIsPlaceOrderOpen] = useState(false);

  const [selectedItems, setSelectedItems] = useState<IOrderedMenuItem[]>([]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const closeConfirmationMenu = () => {
    setIsPlaceOrderOpen(false);
  };

  return (
    <>
      <Head>
        <title>Order Food | Kata</title>
        <meta
          property="og:title"
          content="Order Food | Kata"
          key="Order Food"
        />
      </Head>
      <div className="flex items-start justify-between gap-10">
        <div className="min-w-0 grow">
          <h1 className="my-8 font-merriweather text-2xl font-bold text-gray-800 sm:text-3xl md:my-12">
            Start your Order
          </h1>
          <BrowseMenu
            isOpen={isMenuOpen}
            closeModal={closeMenu}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
          <PlaceOrder
            isOpen={isPlaceOrderOpen}
            closeModal={closeConfirmationMenu}
            orderedItems={selectedItems}
          />
          <OrderDetails
            orderItems={selectedItems}
            setOrderItems={setSelectedItems}
            onClick={() => setIsMenuOpen(true)}
          />
          <PersonalDetailsForm />
          <PaymentForm />
          <div className="mb-20 flex flex-wrap gap-7">
            <PrimaryButton
              onClick={() => setIsPlaceOrderOpen(true)}
              className="px-6 py-2.5"
            >
              Place Order
            </PrimaryButton>
            <SecondaryButton
              className="px-6 py-2.5"
              onClick={() => router.back()}
            >
              Go back
            </SecondaryButton>
          </div>
        </div>
        <div className="relative mt-16 hidden h-[400px] w-[400px] lg:block xl:h-[500px] xl:w-[500px]">
          <Image
            src={Hamburger}
            alt="illustration of a hamburger."
            layout="fill"
          />
        </div>
      </div>
    </>
  );
};

export default StartOrderPage;

StartOrderPage.getLayout = (page, pageProps) => (
  <QueryProvider pageProps={pageProps}>
    <AppLayout size="lg">
      <NavigationProvider>
        <Navbar theme="light" />
        <Sidebar />
      </NavigationProvider>
      {page}
    </AppLayout>
  </QueryProvider>
);
