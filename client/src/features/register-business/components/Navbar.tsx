import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import { toast } from 'react-toastify';
import PrimaryButton from 'src/components/button/primary/PrimaryButton';
import Logo from 'src/components/logo/Logo';
import { useAuth } from 'src/layouts/UserProvider';
import { classNames } from 'src/utils/tailwind';

interface NavbarProps {
  theme?: 'light' | 'dark';
}

function Navbar({ theme = 'light' }: NavbarProps) {
  const router = useRouter();
  const user = useAuth()?.user;

  const handleRedirect = () => {
    if (!user) {
      return toast.error('You have to be logged in to register your business');
    }
    router.push('/register-business/form');
  };

  return (
    <div className="py-4 font-rubik shadow-md md:pt-7 md:shadow-none">
      {/* FOR SMALLER(<md) SCREENS */}
      <div className="flex items-center justify-between md:hidden">
        <Logo />
        <AiOutlineSearch
          size={30}
          className="cursor-pointer hover:text-gray-700"
        />
      </div>

      {/* FOR LARGER(>=md) SCREENS  */}
      <div
        className={classNames(
          theme === 'dark' ? 'text-white' : 'text-black',
          'hidden items-center justify-between md:flex'
        )}
      >
        <Logo />
        <div className="flex items-center gap-7 lg:gap-10">
          <div className="underline-offset-4 hover:underline">
            <Link href="/">
              <a>
                Contact Us <span className="font-medium">(01-4164120)</span>
              </a>
            </Link>
          </div>
          <PrimaryButton onClick={handleRedirect} className="px-6 py-2">
            Create Listing
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
