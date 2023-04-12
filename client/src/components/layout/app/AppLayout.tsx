import Footer from 'src/components/Footer/Footer';
import { classNames } from 'src/utils/tailwind';

interface IAppLayout {
  children: React.ReactNode;
  size: 'sm' | 'lg';
}

function AppLayout({ children, size }: IAppLayout) {
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
