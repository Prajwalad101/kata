import { BusinessCard } from '@features/recommended-business/components';
import { useFetchRecommendBusiness } from '@features/search-business/hooks';
import Link from 'next/link';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import AppLayout from 'src/components/layout/app/AppLayout';
import Slider from 'src/components/slider/Slider';
import { ButtonProps } from 'src/types/props';

interface IRecommendedSection {
  title: string;
  description: string;
  groupBy: string;
}

function RecommendedSection({
  title,
  description,
  groupBy: _groupBy,
}: IRecommendedSection) {
  const businessResult = useFetchRecommendBusiness();
  const businesses = businessResult.data;

  if (!businesses || businesses.documentCount <= 0) {
    return <></>;
  }

  return (
    <AppLayout size="sm">
      <div className="font-rubik">
        <h3 className="mb-2 text-xl font-medium text-gray-800 sm:text-[22px] md:mt-10 md:text-2xl">
          {title}
        </h3>
        <p className="mb-5 text-base text-gray-800 md:block">{description}</p>

        <Slider
          numItems={businesses.documentCount}
          LeftButton={LeftButton}
          RightButton={RightButton}
          className="sm:-mx-2"
        >
          {businesses.data.map((business, index) => (
            <div key={index} className="w-full sm:w-1/2 sm:px-2 lg:w-1/4">
              <Link href="/">
                <a>
                  <BusinessCard business={business} />
                </a>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </AppLayout>
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
