import { Navbar } from '@features/register-business/components';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Success from 'public/animations/register-business/completed.gif';
import Error from 'public/animations/register-business/error.gif';
import SecondaryButton from 'src/components/button/secondary/SecondaryButton';
import AppLayout from 'src/components/layout/app/AppLayout';
import { NextPageWithLayout } from 'src/pages/_app';

const SubmitBusiness: NextPageWithLayout = () => {
  const router = useRouter();
  const { query } = router;

  if (query.status === 'success') {
    return <DisplaySuccess id={query.id} />;
  }

  if (query.status === 'error') {
    return <DisplayError />;
  }

  return <></>;
};

const DisplaySuccess = (props: { id: string | string[] | undefined }) => {
  return (
    <div className="relative flex flex-col items-center font-rubik">
      {/* <Image src={Confetti} alt="" /> */}
      <div className="confetti-background absolute z-10 h-full w-[700px]" />
      <div className="mt-5">
        <Image
          src={Success}
          alt="loading-animation"
          width={300}
          height={300}
          className="pt-10"
          objectFit="cover"
        />
      </div>
      <div className="z-10 flex flex-col items-center">
        <h1 className="mt-10 mb-7 text-center font-merriweather text-3xl font-bold tracking-wider">
          Congratulations. You&apos;re all set up.
        </h1>
        <p className="mb-5 text-center text-lg text-secondarytext">
          Now, let&apos;s have a look at your business
        </p>
        <SecondaryButton className="z-10 py-2 px-10">
          <Link href={`/search/business/${props.id}`}>
            <a>
              <p className="text-base sm:text-lg">View your listing</p>
            </a>
          </Link>
        </SecondaryButton>
      </div>
    </div>
  );
};

const DisplayError = () => {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center font-rubik">
      <div className="mt-5">
        <Image
          src={Error}
          alt="error-animation"
          width={250}
          height={250}
          className="pt-10"
        />
      </div>
      <div className="z-10 flex flex-col items-center">
        <h1 className="mt-10 mb-7 text-center font-merriweather text-3xl font-bold tracking-wider">
          Something went wrong :(
        </h1>
        <p className="mb-5 text-center text-lg text-secondarytext">
          Sorry about that. Please try again later. <br />
          <span className="text-base text-primaryred">
            If it still does not work, try contacting our support department
          </span>
        </p>
        <SecondaryButton
          className="z-10 py-2 px-10"
          onClick={() => router.back()}
        >
          <p className="text-base sm:text-lg">Go back</p>
        </SecondaryButton>
      </div>
    </div>
  );
};

SubmitBusiness.getLayout = (page) => (
  <AppLayout size="sm">
    <Navbar />
    {page}
  </AppLayout>
);

export default SubmitBusiness;
