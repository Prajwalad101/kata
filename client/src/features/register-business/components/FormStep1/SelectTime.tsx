import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { BiTime } from 'react-icons/bi';
import { classNames } from 'src/utils/tailwind';
import { TimeString } from './data';

interface SelectTimeProps {
  selected: TimeString | undefined;
  onChange: (_value: TimeString) => void;
  list: TimeString[];
  disabled: boolean;
}

export default function SelectTime({
  list,
  disabled,
  selected,
  onChange,
}: SelectTimeProps) {
  return (
    <div className="w-32 font-rubik">
      <Listbox disabled={disabled} value={selected} onChange={onChange}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button
              className={classNames(
                open ? 'ring-[3px] ring-blue-400' : 'border-2 border-gray-300',
                'relative w-full rounded-md px-5 py-2 text-left'
              )}
            >
              <>
                <span
                  className={classNames(
                    'block truncate capitalize',
                    disabled ? 'text-gray-400' : 'text-gray-600'
                  )}
                >
                  {selected}
                </span>

                <span
                  className={classNames(
                    disabled ? 'text-gray-400' : 'text-gray-600',
                    'absolute right-0 top-1/2 -translate-y-1/2 pr-2'
                  )}
                >
                  <BiTime size={19} />
                </span>
              </>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                {list.map((listItem, index) => (
                  <Listbox.Option
                    key={index}
                    value={listItem}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-gray-100' : '',
                        'relative cursor-default py-1.5 pl-4'
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                        <p
                          className={classNames(
                            selected
                              ? 'font-medium'
                              : 'font-normal text-gray-600',
                            'rounded-md  capitalize'
                          )}
                        >
                          {listItem}
                        </p>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}
