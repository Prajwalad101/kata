import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { ICategoryDropdown } from 'src/types/business';
import { classNames } from 'src/utils/tailwind';

export interface SidebarCategoryDropdownProps {
  category: ICategoryDropdown;
  onClick: () => void;
}

function SidebarCategoryDropdown({
  category,
  onClick,
}: SidebarCategoryDropdownProps) {
  // currently selected items
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const handleSelectItem = (item: string) => {
    if (selectedCategory === item) {
      setSelectedCategory('');
      return;
    }
    setSelectedCategory(item);
  };

  return (
    <>
      <div
        onClick={() => handleSelectItem(category.name)}
        className="mt-2 flex cursor-pointer items-center gap-2 rounded-md py-2 transition-all duration-300 hover:bg-gray-200 hover:pl-2"
      >
        {category.name === selectedCategory ? (
          <AiOutlineMinus className="text-gray-700" />
        ) : (
          <AiOutlinePlus className="text-gray-700" />
        )}
        <p className="capitalize">{category.name}</p>
      </div>
      {/* Subcategory items */}
      <div
        className={classNames(
          selectedCategory === category.name
            ? 'opacity-100'
            : 'absolute -z-10 opacity-0 transition-none',
          'ml-6 transition-opacity duration-500 ease-linear'
        )}
      >
        {category.subcategories.map((item, index) => (
          //! city is hardcoded
          <Link
            key={index}
            href={{
              pathname: '/search/business',
              query: { name: item.name, city: 'kathmandu' },
            }}
          >
            <div
              key={index}
              className="group flex cursor-pointer gap-2 py-2"
              onClick={onClick}
            >
              {/* Hover bar */}
              <div className="group rounded-md border-2 border-primaryred opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              {/* Sub item */}
              <div className="flex items-center gap-3 text-gray-700 hover:text-black">
                <div className="group-hover:text-primaryred">{item.icon}</div>
                <p className="capitalize">{item.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default SidebarCategoryDropdown;
