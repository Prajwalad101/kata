import {
  BusinessCategories,
  businessCategories,
} from '@destiny/common/types/business/BusinessCategory';
import { isString } from '@destiny/common/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';

interface FilterFeaturesProps {
  selectedFeatures: string[];
  setSelectedFeatures: (_features: string[]) => void;
}

export default function FilterFeatures({
  selectedFeatures,
  setSelectedFeatures,
}: FilterFeaturesProps) {
  const { query } = useRouter();
  const [subCategoryName, setSubCategoryName] = useState<string>();
  const [categoryName, setCategoryName] = useState<string>();

  useEffect(() => {
    if (isString(query.name)) {
      setSubCategoryName(query.name);
    }
    if (isString(query.category)) {
      setCategoryName(query.category);
    }
  }, [query.name, query.category]);

  // if no category and subcategory name present, don't render filter
  if (!subCategoryName && !categoryName) {
    return <></>;
  }

  let businessCategory: BusinessCategories[number] | undefined;

  if (categoryName) {
    businessCategory = businessCategories.find(
      (category) => category.name === categoryName
    );
  }

  if (subCategoryName) {
    businessCategory = businessCategories.find((category) =>
      category.subcategories.includes(subCategoryName)
    );
  }

  // if no businessCategory found, don't render filter
  if (!businessCategory) {
    return <></>;
  }

  // grab all the featureTypes and remove duplicates
  let featureTypes = businessCategory.features.map((feature) => feature.tag);
  featureTypes = [...new Set(featureTypes)];

  return (
    <div className="hidden h-max rounded-md bg-gray-100 font-rubik shadow-sm lg:block">
      <div className=" w-[340px] px-8 py-6">
        <div className="mb-12 flex w-full flex-col gap-y-7">
          {featureTypes.map((featureType, index) => (
            <div key={index}>
              <p className="mb-5 text-lg font-medium capitalize text-gray-800">
                {featureType}
              </p>
              <FilterGroup
                featureType={featureType}
                businessCategory={businessCategory}
                selectedFeatures={selectedFeatures}
                setSelectedFeatures={setSelectedFeatures}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FilterGroupProps {
  businessCategory: BusinessCategories[number] | undefined;
  featureType: string;
  selectedFeatures: string[];
  setSelectedFeatures: (_features: string[]) => void;
}

// contains filters for each feature type
function FilterGroup({
  businessCategory,
  featureType,
  selectedFeatures,
  setSelectedFeatures,
}: FilterGroupProps) {
  const features = businessCategory?.features.filter(
    (feature) => feature.tag === featureType
  );

  return (
    <>
      {features?.map((feature, index) => (
        <div key={index}>
          <Checkbox
            className="mb-4"
            feature={feature.value}
            selectedFeatures={selectedFeatures}
            setSelectedFilters={setSelectedFeatures}
          />
        </div>
      ))}
    </>
  );
}
