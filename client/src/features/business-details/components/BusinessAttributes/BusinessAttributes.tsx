import { businessCategories } from '@destiny/common/types/business/BusinessCategory';
import { useState } from 'react';
import { FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { classNames } from 'src/utils/tailwind';

interface BusinessAttributesProps {
  categoryName: string;
  features: string[];
  className?: string;
}

export default function BusinessAttributes({
  features,
  categoryName,
  className = '',
}: BusinessAttributesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const businessCategory = businessCategories.find(
    (category) => category.name === categoryName
  );

  const allFeatures = businessCategory?.features.map(
    (feature) => feature.value
  );

  return (
    <div className={classNames(className)}>
      <div className="mb-5 border border-gray-200" />
      <div className="mb-6 flex flex-col gap-3 xs:flex-row xs:items-center xs:justify-between ">
        <h4 className="text-xl font-medium">Business Attributes</h4>
        <div
          className="group flex cursor-pointer items-center gap-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <button className="text-gray-800 group-hover:text-gray-600">
            {isExpanded ? 'Show less' : 'Expand'}
          </button>
          {isExpanded ? (
            <FiChevronUp size={20} className="shrink-0" />
          ) : (
            <FiChevronDown size={20} className="shrink-0" />
          )}
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(max(150px,25%),1fr))]">
        {allFeatures?.map((feature, i) => {
          // display max 4 items when not expanded
          if (!isExpanded && i > 3) return;

          const doesExist = features.includes(feature);
          return (
            <div key={i} className="flex items-center gap-2 rounded-md py-4">
              {doesExist ? (
                <FiCheck className="text-green-500" size={20} />
              ) : (
                <IoMdClose size={20} className="text-red-600" />
              )}
              <p
                className={classNames(
                  'capitalize',
                  !doesExist ? 'text-gray-500' : ''
                )}
              >
                {feature}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mb-12 border border-gray-200 md:mb-16" />
    </div>
  );
}
