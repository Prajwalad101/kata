import useSearchBusiness from '@features/home-page/api/useSearchBusiness';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import useDebounce from 'src/hooks/useDebounce';
import { classNames } from 'src/utils/tailwind';

interface SearchbarProps {
  placeholder1: string;
  placeholder2: string;
  className?: string;
}

function Searchbar({
  placeholder1,
  placeholder2,
  className = '',
}: SearchbarProps) {
  const [searchText, setSearchText] = useState<string>();
  const [debouncedText, setDebouncedText] = useState<string>();

  const { data, isLoading } = useSearchBusiness(debouncedText);

  const debounceCb = (text: string | undefined) => {
    console.log('debounce callback called');
    setDebouncedText(text);
  };

  // debounce handleChange for 2 secs
  const handleDebounce = useDebounce(debounceCb, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    handleDebounce(event.target.value);
  };

  return (
    <div
      className={classNames(
        'relative flex h-[51.5px] w-full items-center overflow-hidden bg-gray-500 font-merriweather md:h-[60px]',
        'ring-blue-500 ring-offset-2 ring-offset-gray-600 focus-within:ring-2 active:ring-2',
        className
      )}
    >
      {/* TOPIC SEARCH INPUT FIELD */}
      <input
        className="h-full w-full rounded-sm bg-[#E6E6E6] px-4 text-base md:bg-white"
        type="text"
        placeholder={placeholder1}
        onChange={handleChange}
        value={searchText}
      />

      {/* LOCATION SEARCH INPUT FIELD  */}
      <input
        className="absolute right-0 hidden h-full w-1/2 rounded-r-sm border-l-2 bg-[#E6E6E6] pl-3 pr-16 text-[15px] outline-none md:block md:bg-white"
        type="text"
        placeholder={placeholder2}
      />

      {/* SEARCH BUTTON */}
      <button className="absolute bottom-0 right-0 flex h-full w-[60px] items-center justify-center rounded-r-sm bg-primaryred text-white  hover:bg-red-500">
        <AiOutlineSearch size={23} />
      </button>
    </div>
  );
}

export default Searchbar;
