import { BusinessPage } from '@features/search-business/hooks/useFetchRecommendBusiness';
import Image from 'next/image';
import RatingIcons from 'src/components/icons/ratings/RatingIcons';
import { getPublicFilePath } from 'src/utils/text';

export interface BusinessCardProps {
  business: BusinessPage[number];
}

function BusinessCard({ business }: BusinessCardProps) {
  const images = business.images?.map((image) => getPublicFilePath(image));

  return (
    <div className="transition-color group cursor-pointer rounded-md font-rubik hover:bg-gray-50">
      <div className="relative h-[200px] sm:h-[250px]">
        <Image
          src={images[0]}
          alt={business.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-sm transition-opacity group-hover:opacity-90"
        />
      </div>

      <div className="rounded-sm px-2 pt-3">
        {/* Business Name */}
        <div className="mb-1">
          <p className="text-base font-medium sm:text-lg">{business.name}</p>
        </div>
        {/* Business Rating */}
        <div className="mb-2 flex gap-2 ">
          <RatingIcons avgRating={business.avgRating} />
          <span className="text-sm text-secondarytext">
            ({business.ratingCount})
          </span>
        </div>

        {/* Location */}
        <p className="mb-1 overflow-hidden text-ellipsis whitespace-nowrap pb-5 text-sm">
          {business.location.address}
        </p>
      </div>
    </div>
  );
}

export default BusinessCard;
