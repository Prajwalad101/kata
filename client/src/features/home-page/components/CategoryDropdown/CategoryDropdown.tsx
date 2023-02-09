import Link from 'next/link';
import { BsChevronDown } from 'react-icons/bs';
import { ISubcategoryDropdown } from 'src/types/business';
import { classNames } from 'src/utils/tailwind';

interface CategoryDropdownProps {
  name: string;
  headingColor?: 'black' | 'white';
  subcategories: ISubcategoryDropdown[];
}

export default function CategoryDropdown({
  name,
  subcategories,
  headingColor = 'white',
}: CategoryDropdownProps) {
  // to display items in two columns
  const evenItems = subcategories.filter(
    (_subCategory, i) => i % 2 === 0 || i === 0
  );
  const oddItems = subcategories.filter((_subCategory, i) => i % 2 !== 0);

  //! FIX: Change the static city variable
  const link = (subcategory: ISubcategoryDropdown, index: number) => (
    <Link
      key={index}
      href={{
        pathname: '/search/business',
        query: { name: subcategory.name, city: 'kathmandu' },
      }}
    >
      <a>
        <div className="flex items-center gap-3 hover:cursor-pointer hover:text-gray-600">
          <p className="whitespace-nowrap">{subcategory.name}</p>
          {subcategory.icon}
        </div>
      </a>
    </Link>
  );

  return (
    <div className="relative h-max capitalize">
      {/* Dropdown heading */}
      <div
        className={classNames(
          'peer flex cursor-pointer items-center gap-1 text-white hover:opacity-70',
          headingColor === 'white' ? 'text-white' : 'text-black'
        )}
      >
        <span className="inline-block">{name}</span>
        <BsChevronDown />
      </div>

      <div className="peer h-2" />

      {/* Dropdown menu */}
      <div className="invisible absolute z-30 flex gap-x-10 rounded-sm bg-white  p-4 opacity-0 shadow-md transition-opacity delay-100 hover:visible hover:opacity-100 peer-hover:visible peer-hover:opacity-100">
        <div className="flex flex-col gap-y-4">
          {evenItems.map((subcategory, index) => link(subcategory, index))}
        </div>

        <div className="flex flex-col gap-y-4">
          {oddItems.map((subcategory, index) => link(subcategory, index))}
        </div>
      </div>
    </div>
  );
}
