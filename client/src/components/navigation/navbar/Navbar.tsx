import LoginModal from '@features/authentication/components/LoginModal';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import PrimaryButton from 'src/components/button/primary/PrimaryButton';
import SecondaryButton from 'src/components/button/secondary/SecondaryButton';
import { useSidebar } from 'src/components/context-provider';
import Logo from 'src/components/logo/Logo';
import UserProfile from 'src/components/userprofile/UserProfile';
import { usePreventBodyOverflow } from 'src/hooks';
import useCookie from 'src/hooks/browser/useCookie';
import { classNames } from 'src/utils/tailwind';

interface INavbar {
  theme: 'light' | 'dark';
}

function Navbar({ theme }: INavbar) {
  const { open, setOpen } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  usePreventBodyOverflow(open);

  const accessToken = useCookie('access-token', null);

  return (
    <>
      <LoginModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
      <div className="py-4 font-rubik md:pt-7">
        {/* For smaller(<md) screens */}
        <div className="flex items-center justify-between md:hidden">
          {/* Hamburger Icon */}
          <BiMenu
            size={35}
            onClick={() => setOpen(!open)}
            className="cursor-pointer hover:text-gray-700"
          />
          <Logo />
          <AiOutlineSearch
            size={30}
            className="cursor-pointer hover:text-gray-700"
          />
        </div>
        {/* For larger(>= md) screens */}
        <div
          className={classNames(
            theme === 'dark' ? 'text-white' : 'text-black',
            'hidden items-center justify-between md:flex'
          )}
        >
          <Logo />
          <div className="flex items-center gap-7 lg:gap-10">
            <div className="underline-offset-4 hover:underline">
              <Link href="/register-business">
                <a>For Businesses</a>
              </Link>
            </div>
            <div className="underline-offset-4 hover:underline">
              <Link href="/">
                <SecondaryButton theme={theme}>
                  <p className="py-2 px-6">Write a review</p>
                </SecondaryButton>
              </Link>
            </div>
            {/* Login Buttons */}
            {accessToken ? (
              <UserProfile accessToken={accessToken} />
            ) : (
              <PrimaryButton onClick={() => setIsModalOpen(true)}>
                <p className="py-2 px-6">Sign In</p>
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="absolute left-0 right-0 w-full border border-gray-300 md:hidden" />
    </>
  );
}

export default Navbar;
