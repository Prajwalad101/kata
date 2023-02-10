import { businessFeatures } from '@destiny/common/types';
import { useState } from 'react';
import { FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { classNames } from 'src/utils/tailwind';

interface BusinessAttributesProps {
  attributes: string[];
  className?: string;
}

const allAttributes = Object.values(businessFeatures);

export default function BusinessAttributes({
  attributes,
  className = '',
}: BusinessAttributesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
        {allAttributes.map((attribute, i) => {
          if (!isExpanded && i > 3) return;
          const doesExist = attributes.includes(attribute);
          return (
            <div key={i} className="flex items-center gap-2 rounded-md py-4">
              {doesExist ? (
                <FiCheck size={20} />
              ) : (
                <IoMdClose size={20} className="text-red-600" />
              )}

              <p
                className={classNames(
                  'capitalize',
                  !doesExist ? 'text-gray-500' : ''
                )}
              >
                {attribute}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mb-12 border border-gray-200 md:mb-16" />
    </div>
  );
}
