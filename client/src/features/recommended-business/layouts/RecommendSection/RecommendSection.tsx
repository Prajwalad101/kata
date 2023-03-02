import { IBusiness } from '@destiny/common/types';
import { BusinessCard } from '@features/recommended-business/components';
import { isError } from '@tanstack/react-query';
import Link from 'next/link';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import AppLayout from 'src/components/layout/app/AppLayout';
import Slider from 'src/components/slider/Slider';
import { ButtonProps } from 'src/types/props';

interface IRecommendedSection {
  title: string;
  description: string;
  data:
    | { status: string; documentCount: number; data: IBusiness[] }
    | undefined;
  isLoading: boolean;
}

function RecommendedSection({
  title,
  description,
  data,
  isLoading,
}: IRecommendedSection) {
  return (
    <AppLayout size="sm">
      <div className="font-rubik">
        <h3 className="mb-2 text-xl font-medium text-gray-800 sm:text-[22px] md:mt-10 md:text-2xl">
          {title}
        </h3>
        <p className="mb-5 text-base text-gray-600 md:block">{description}</p>
        {isLoading && <BusinessSkeleton />}
        {data && (
          <Slider
            numItems={data.documentCount}
            LeftButton={LeftButton}
            RightButton={RightButton}
            className="sm:-mx-2"
          >
            {data.data.map((business, index) => (
              <div key={index} className="w-full sm:w-1/2 sm:px-2 lg:w-1/4">
                <Link href="/">
                  <a>
                    <BusinessCard business={business} />
                  </a>
                </Link>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </AppLayout>
  );
}

function BusinessSkeleton() {
  const arr = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-3 overflow-scroll">
      {arr.map((_, index) => (
        <div
          key={index}
          className="animate h-[200px] min-w-[250px] rounded-sm bg-gray-200 sm:h-[250px] sm:w-1/2 lg:w-1/4"
        />
      ))}
    </div>
  );
}

const RightButton = ({ onClick, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      onClick={onClick}
      type="button"
      className="absolute right-[10px] top-[38%] z-10 translate-y-[-50%] rounded-full bg-gray-50 p-1 shadow-md transition-colors hover:bg-primaryred hover:text-xl hover:text-white md:right-[15px]"
    >
      <MdKeyboardArrowRight size={25} />
    </button>
  );
};

const LeftButton = ({ onClick, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      onClick={onClick}
      type="button"
      className="absolute left-[10px] top-[38%] z-10 translate-y-[-50%] rounded-full bg-gray-50 p-1 shadow-md transition-colors hover:bg-primaryred hover:text-xl hover:text-white md:left-[15px]"
    >
      <MdKeyboardArrowLeft size={25} />
    </button>
  );
};

export default RecommendedSection;
