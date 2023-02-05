import useSearchBusiness from '@features/home-page/api/useSearchBusiness';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';
import useDebounce from 'src/hooks/useDebounce';
import { classNames } from 'src/utils/tailwind';

function Searchbar() {
  const [searchText, setSearchText] = useState<string>();
  const [debouncedText, setDebouncedText] = useState<string>();

  const { data, isError } = useSearchBusiness(debouncedText);

  const debounceCb = (text: string | undefined) => {
    setDebouncedText(text);
  };

  // debounce handleChange for 2 secs
  const handleDebounce = useDebounce(debounceCb, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    handleDebounce(event.target.value);
  };

  return (
    <div className="relative max-w-xl shadow-md transition-shadow md:max-w-2xl">
      <div
        className={classNames(
          'h-[52px] items-center overflow-hidden rounded-md bg-gray-500 font-merriweather focus-within:shadow-lg md:h-[60px]',
          'ring-blue-500 ring-offset-2 ring-offset-gray-600 focus-within:ring-2 active:ring-2'
        )}
      >
        {/* TOPIC SEARCH INPUT FIELD */}
        <input
          className="h-full w-full rounded-sm bg-[#E6E6E6] px-4 text-base md:bg-white"
          type="text"
          placeholder="Search businesses by name, city, or address"
          onChange={handleChange}
          value={searchText}
        />

        {/* SEARCH BUTTON */}
        <button className="absolute bottom-0 right-0 flex h-full w-[60px] cursor-default items-center justify-center rounded-r-sm bg-primaryred text-white">
          <AiOutlineSearch size={23} />
        </button>
      </div>
      <div
        className={classNames(
          'absolute w-full rounded-md bg-white duration-500',
          searchText ? 'top-[68px] z-10' : 'top-0 -z-10 h-full'
        )}
      >
        {isError && <p>Something went wrong. Please try again later</p>}
        {data?.documentCount === 0 && (
          <p className="px-4 py-5 text-gray-500">Could not find business : (</p>
        )}
        {searchText &&
          data?.data.map((business) => (
            <div
              key={business._id}
              className="my-1 flex cursor-pointer items-center justify-between bg-white px-5 py-2.5 duration-150 hover:bg-gray-100"
            >
              <div className="flex items-center gap-4">
                <p className="font-medium">{business.name}</p>
                <p className="text-sm capitalize text-gray-400">
                  ({business.category})
                </p>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <GrLocation className="text-gray-700" />
                <p className="text-sm">{business.location.address}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Searchbar;
