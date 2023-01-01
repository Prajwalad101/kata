import { AiOutlineSearch } from 'react-icons/ai';
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
  return (
    <div
      className={classNames(
        'relative flex h-[51.5px] w-full items-center overflow-hidden bg-gray-500 font-merriweather md:h-[60px]',
        className
      )}
    >
      {/* TOPIC SEARCH INPUT FIELD */}
      <input
        className="h-full w-full rounded-sm bg-[#E6E6E6] px-4 text-base md:bg-white"
        type="text"
        placeholder={placeholder1}
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
