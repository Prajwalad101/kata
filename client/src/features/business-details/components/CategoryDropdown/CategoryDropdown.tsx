import Link from 'next/link';
import { RiArrowDownSLine } from 'react-icons/ri';
import { ISubcategoryDropdown } from 'src/types/business';

interface CategoryDropdownProps {
  name: string;
  subcategories: ISubcategoryDropdown[];
}

export default function CategoryDropdown({
  name,
  subcategories,
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
    <div className="relative capitalize">
      {/* Dropdown heading */}
      <div className="peer flex items-center gap-1 text-white hover:cursor-pointer">
        <p>{name}</p>
        <RiArrowDownSLine size={25} />
      </div>

      <div className="peer h-2" />

      {/* Dropdown menu */}
      <div className="invisible absolute flex gap-x-10  rounded-sm bg-white p-4 opacity-0 transition-opacity delay-100 hover:visible hover:opacity-100 peer-hover:visible peer-hover:opacity-100">
        <div className="flex flex-col gap-y-3">
          {evenItems.map((subcategory, index) => link(subcategory, index))}
        </div>

        <div className="flex flex-col gap-y-3">
          {oddItems.map((subcategory, index) => link(subcategory, index))}
        </div>
      </div>
    </div>
  );
}
