import { BusinessCard } from '@features/recommended-business/components';
import { useBusinesses } from '@features/search-business/hooks';
import Link from 'next/link';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
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
  const businessResult = useBusinesses();
  const businesses = businessResult.data?.data;

  if (!businesses || businesses?.length <= 0) {
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
          numItems={businesses.length}
          LeftButton={LeftButton}
          RightButton={RightButton}
          className="sm:-mx-2"
        >
          {businesses.map((business, index) => (
            <div key={index} className="w-full sm:w-1/2 sm:px-2 lg:w-1/4">
              <Link href={`search/business/${business._id}`}>
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

const RightButton = ({ onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="absolute right-[10px] top-[35%] z-10 translate-y-[-50%] rounded-full bg-gray-50 p-2 shadow-md transition-colors hover:bg-primaryred hover:text-xl hover:text-white md:right-[15px]"
    >
      <AiOutlineRight size={20} />
    </button>
  );
};

const LeftButton = ({ onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="absolute left-[10px] top-[35%] z-10 translate-y-[-50%] rounded-full bg-gray-50 p-2 shadow-md transition-colors hover:bg-primaryred hover:text-xl hover:text-white md:left-[15px]"
    >
      <AiOutlineLeft size={20} />
    </button>
  );
};

export default RecommendedSection;
