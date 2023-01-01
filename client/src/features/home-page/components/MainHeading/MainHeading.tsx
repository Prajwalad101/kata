import { classNames } from 'src/utils/tailwind';

function MainHeading({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        'font-merriweather font-black md:text-white',
        className
      )}
    >
      <h1 className="text-4xl leading-tight tracking-wide sm:text-[40px] md:text-5xl md:leading-[69px]">
        {children}
      </h1>
    </div>
  );
}

export default MainHeading;
