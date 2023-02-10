import { IReviewSortOption } from '@features/business-details/data';
import { Menu, Transition } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';
import { classNames } from 'src/utils/tailwind';

interface SortReviewProps {
  sortOptions: IReviewSortOption[];
  selectedSort: IReviewSortOption;
  onSelect: (_value: IReviewSortOption) => void;
}

export default function SortReview({
  sortOptions,
  selectedSort,
  onSelect,
}: SortReviewProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-1 rounded-full border border-gray-500 px-7 py-[9px] capitalize">
        <span className="text-sm">{selectedSort.name}</span>
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
            if (sortOption.name === selectedSort.name) return;
            return (
              <Menu.Item key={sortOption.id}>
                {({ active }) => (
                  <button
                    className={classNames(
                      'w-full whitespace-nowrap px-7 py-[9px] text-left text-sm capitalize',
                      active ? 'bg-gray-100' : ''
                    )}
                    onClick={() => onSelect(sortOption)}
                  >
                    {sortOption.name}
                  </button>
                )}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
