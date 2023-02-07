import { BusinessCard } from '@features/search-business/components';
import { SearchBusinessResponse } from '@features/search-business/hooks/useFetchRecommendBusiness';

function BusinessList({
  businessData,
}: {
  businessData: SearchBusinessResponse | undefined;
}) {
  if (!businessData) return <></>;

  return (
    <>
      {businessData.map((business) => (
        <div key={business._id.toString()} className="mb-4">
          <BusinessCard business={business} />
        </div>
      ))}
    </>
  );
}

export default BusinessList;
