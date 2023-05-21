import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Footer from 'src/components/Footer/Footer';
import { classNames } from 'src/utils/tailwind';

interface IAppLayout {
  children: React.ReactNode;
  size: 'sm' | 'lg';
}

function AppLayout({ children, size }: IAppLayout) {
  const router = useRouter();

  const { authentication } = router.query;

  useEffect(() => {
    if (authentication?.includes('success')) {
      toast.success('Successfully logged in', {
        toastId: 'login-success',
      });
    }
    if (authentication?.includes('error')) {
      toast.error('Something went wrong', {
        toastId: 'login-error',
      });
    }
  }, [router, authentication]);

  return (
    <div
      className={classNames(
        size === 'sm' ? 'lg:max-w-[1200px]' : 'lg:max-w-[1400px]',
        'mx-auto px-3 sm:px-7'
      )}
    >
      {children}
      <Footer />
    </div>
  );
}

export default AppLayout;
