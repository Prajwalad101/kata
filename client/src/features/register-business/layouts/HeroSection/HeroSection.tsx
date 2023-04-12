import ErrorMessage from '@destiny/common/data/errorsMessages';
import { MainHeading } from '@features/home-page/components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsClipboardData, BsLightbulb, BsPeople } from 'react-icons/bs';
import { toast } from 'react-toastify';
import PrimaryButton from 'src/components/button/primary/PrimaryButton';
import { useAuth } from 'src/layouts/UserProvider';

function HeroSection() {
  return (
    <div>
      <div className="h-[550px] font-rubik md:h-[600px]">
        {/* BG Image */}
        <div className="absolute inset-0 -z-10 hidden h-[650px] bg-for-business-main bg-cover bg-no-repeat md:block md:h-[700px]" />
        {/* Overlay */}
        <div className="absolute inset-0 -z-10 hidden h-[650px] w-full bg-gray-600 opacity-10 md:block md:h-[700px]" />
        <MainHeading className="mb-3 max-w-sm sm:max-w-[40rem]">
          Register your business for free
        </MainHeading>
        <SubHeading />
        <CallToAction />
      </div>
    </div>
  );
}

function SubHeading() {
  return (
    <p className="mb-7 text-lg text-gray-700 md:mb-10 md:text-gray-100">
      <span className="font-medium text-black md:text-white">Create</span>,{' '}
      <span className="font-medium text-black md:text-white">Improve</span> and{' '}
      <span className="font-medium text-black md:text-white">Manage</span> your
      business with ease
    </p>
  );
}

function CallToAction() {
  const router = useRouter();
  const user = useAuth()?.user;

  const handleRedirect = () => {
    if (!user) {
      return toast.error('You have to be logged in to register your business');
    }
    router.push('/register-business/form');
  };

  return (
    <div className="max-w-sm rounded-md bg-gray-200 px-5 py-6 md:bg-white">
      <div className="mb-7 text-secondarytext child-notlast:mb-3">
        <div className="flex items-center gap-2">
          <BsClipboardData size={20} />
          <p>Manage your business information</p>
        </div>
        <div className="flex items-center gap-2">
          <BsPeople size={20} />
          <p>Interact with customers</p>
        </div>
        <div className="flex items-center gap-2">
          <BsLightbulb />
          <p>Receive important reviews</p>
        </div>
      </div>
      <p className="mb-4 font-semibold text-black">
        Set up your listing in minutes
      </p>
      <PrimaryButton onClick={handleRedirect}>
        <p className="px-6 py-2">Register now</p>
      </PrimaryButton>
    </div>
  );
}

export default HeroSection;
