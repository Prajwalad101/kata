import { BusinessCard } from '@features/search-business/components';
import { BusinessPage } from '@features/search-business/hooks/useFetchRecommendBusiness';

function BusinessList({
  businessData,
}: {
  businessData: BusinessPage | undefined;
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
