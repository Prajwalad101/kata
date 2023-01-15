import getGoogleOAuthUrl from '@features/authentication/utils/getGoogleUrl';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import PrimaryButton from 'src/components/button/primary/PrimaryButton';
import SecondaryButton from 'src/components/button/secondary/SecondaryButton';
import { useSidebar } from 'src/components/context-provider';
import Logo from 'src/components/logo/Logo';
import { usePreventBodyOverflow } from 'src/hooks';
import { classNames } from 'src/utils/tailwind';

interface INavbar {
  theme: 'light' | 'dark';
}

function Navbar({ theme }: INavbar) {
  const { open, setOpen } = useSidebar();

  usePreventBodyOverflow(open);

  return (
    <>
      <div className="py-4 font-rubik md:pt-7">
        {/* For smaller(<md) screens */}
        <div className="flex items-center justify-between md:hidden">
          {/* Hamburger Icon */}
          <BiMenu
            size={35}
            onClick={() => setOpen(!open)}
            className="cursor-pointer hover:text-gray-700"
          />
          <Logo>Logo</Logo>
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
          <Logo>Logo</Logo>
          <div className="flex items-center gap-7 lg:gap-10">
            <div className="underline-offset-4 hover:underline">
              <Link href="/">
                <a>For Businesses</a>
              </Link>
            </div>
            <div className="underline-offset-4 hover:underline">
              <Link href="/">
                <a>Write a review</a>
              </Link>
            </div>
            {/* Login Buttons */}
            <Link href={getGoogleOAuthUrl()}>
              <SecondaryButton theme={theme}>
                <p className="py-2 px-6">Sign Up</p>
              </SecondaryButton>
            </Link>
            <PrimaryButton>
              <p className="py-2 px-6">Log In</p>
            </PrimaryButton>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="absolute left-0 right-0 w-full border border-gray-300 md:hidden" />
    </>
  );
}

export default Navbar;
