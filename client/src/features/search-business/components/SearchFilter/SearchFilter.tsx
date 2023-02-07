import { businessCategories } from '@destiny/common/types/business/BusinessCategory';
import Checkbox from '../Checkbox/Checkbox';

interface FilterFeaturesProps {
  selectedFeatures: string[];
  setSelectedFeatures: (_features: string[]) => void;
}

export default function FilterFeatures({
  selectedFeatures,
  setSelectedFeatures,
}: FilterFeaturesProps) {
  const category = businessCategories[0];

  // grab all the featureTypes and remove duplicates
  let featureTypes = category.features.map((feature) => feature.tag);
  featureTypes = [...new Set(featureTypes)];

  return (
    <div className="hidden h-max rounded-md bg-gray-100 font-rubik lg:block">
      <div className=" w-[340px] px-8 py-6">
        <div className="mb-12 flex w-full flex-col gap-y-7">
          {featureTypes.map((featureType, index) => (
            <div key={index}>
              <p className="mb-5 text-lg font-medium capitalize">
                {featureType}
              </p>
              <FilterGroup
                selectedFeatures={selectedFeatures}
                setSelectedFeatures={setSelectedFeatures}
                filterType={featureType}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FilterGroupProps {
  filterType: string;
  selectedFeatures: string[];
  setSelectedFeatures: (_features: string[]) => void;
}

function FilterGroup({
  filterType,
  selectedFeatures,
  setSelectedFeatures,
}: FilterGroupProps) {
  const features = businessCategories[0].features.filter(
    (feature) => feature.tag === filterType
  );

  return (
    <>
      {features.map((feature, index) => (
        <div key={index}>
          <Checkbox
            className="mb-2"
            feature={feature.value}
            selectedFeatures={selectedFeatures}
            setSelectedFilters={setSelectedFeatures}
          />
        </div>
      ))}
    </>
  );
}
