import { Menu, Transition } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';
import { classNames } from 'src/utils/tailwind';

export interface SortItemsProps {
  sort: string;
  onSelect: (_value: string) => void;
}

export const sortOptions = [
  { label: 'Most Popular', value: '-ratingCount' },
  { label: 'Best Rating', value: '-avgRating' },
  { label: 'Newest', value: '-createdAt' },
];

function SortItems({ sort, onSelect }: SortItemsProps) {
  const sortOption = sortOptions.find((option) => option.value === sort);

  return (
    <div className="flex shrink-0 items-center gap-4 font-rubik">
      <p className="text-secondarytext">Sort By:</p>
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-1 rounded-full border border-gray-500 px-7 py-[9px] capitalize">
          <span className="text-sm">{sortOption?.label}</span>
          <FiChevronDown size={20} />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute top-0 mt-2 rounded-md border border-gray-300 bg-white shadow-sm">
            {sortOptions.map((sortOption) => {
              if (sortOption.value === sort) return;
              return (
                <Menu.Item key={sortOption.value}>
                  {({ active }) => (
                    <button
                      className={classNames(
                        'w-full whitespace-nowrap px-7 py-[9px] text-left text-sm capitalize',
                        active ? 'bg-gray-100' : ''
                      )}
                      onClick={() => onSelect(sortOption.value)}
                    >
                      {sortOption.label}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
      {/* <ReactSelect
        className="grow"
        placeholder="Sort By"
        options={sortOptions}
        defaultValue={sortOptions.find(
          (option) => option.value === selectedSort
        )}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            padding: '4px 0 4px 4px',
          }),
        }}
        onChange={(selected) => setSelectedSort(selected?.value || '')}
      /> */}
    </div>
  );
}

export default SortItems;
