import { IBusiness } from '@destiny/common/types';
import {
  BusinessDescription,
  BusinessImage,
} from '@features/business-details/components';
import openOrClosed from '@features/business-details/components/OpenOrClosed/OpenOrClosed';
import { FaPhoneAlt } from 'react-icons/fa';
import RatingIcons from 'src/components/icons/ratings/RatingIcons';

interface BusinessInfoSectionProps {
  business: IBusiness;
  className?: string;
}

export default function BusinessInfoSection({
  business,
  className = '',
}: BusinessInfoSectionProps) {
  const businessStatus = openOrClosed(business.workingDays);

  return (
    <div className={className}>
      <div className="mb-5 flex flex-col gap-5 md:mb-0 md:flex-row">
        <BusinessImage />
        <div>
          <h4 className="mb-2 text-[23px] font-medium">{business.name}</h4>
          <div className="mb-5 flex items-center gap-10">
            <RatingIcons
              className="gap-1"
              avgRating={business.avgRating}
              size={20}
            />
            <span className="inline-block text-gray-800 underline">
              {business.ratingCount} reviews
            </span>
          </div>
          <span className="mb-2 inline-block">{business.location.address}</span>
          <p className="mb-2 font-medium text-gray-700">{businessStatus}</p>
          <BusinessDescription
            description={business.description}
            className="mb-7"
          />
          {/* <div className="mb-4 flex flex-col gap-2 text-gray-800 sm:flex-row sm:gap-7">
            <span>$$-$$$</span>
            <span>Healthy, Authentic, Vegeterian Friendly</span>
          </div> */}
          <div className="flex items-center gap-3 text-gray-800">
            <FaPhoneAlt size={17} />
            <span>(+977) {business.contactNumber}</span>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 md:hidden" />
    </div>
  );
}
