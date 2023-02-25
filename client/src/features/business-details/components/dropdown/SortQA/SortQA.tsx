import { Menu, Transition } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';
import { classNames } from 'src/utils/tailwind';

interface SortQAProps {
  sortItems: {label: string, value:string}[];
  onSelect: (_value: string) => void;
  selectedSort: string
}


export default function SortQA({onSelect, selectedSort, sortItems} : SortQAProps) {
  const sort = sortItems.find((sortItem) => sortItem.value === selectedSort) 

  return (
    <Menu as="div" className="relative z-30">
      <Menu.Button className="flex w-max items-center gap-1 rounded-full border border-gray-500 px-7 py-[9px] capitalize">
        <span className="text-sm">{sort?.label}</span>
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
          {sortItems.map((sort) => {
            if (sort.value === selectedSort) return;
            return (
              <Menu.Item key={sort.value}>
                {({ active }) => (
                  <button
                    className={classNames(
                      'w-full whitespace-nowrap px-7 py-[9px] text-left text-sm capitalize',
                      active ? 'bg-gray-100' : ''
                    )}
                    onClick={() => onSelect(sort.value)}
                  >
                    {sort.label}
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
