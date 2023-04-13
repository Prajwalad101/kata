import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import useDebounce from 'src/hooks/useDebounce';

interface CommunitySectionSearchProps {
  onChange: (_value: string) => void;
  placeholder: string;
}

export default function CommunitySectionSearch({ onChange, placeholder }: CommunitySectionSearchProps) {
  const [searchText, setSearchText] = useState<string>('');

  const debounceCb = (text: string) => {
    onChange(text);
  };

  // debounce callback for 500 ms
  const handleDebounce = useDebounce(debounceCb, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    handleDebounce(event.target.value);
  };

  return (
    <div className="relative mr-[2px] flex w-max items-center">
      <input
        type="text"
        className="rounded-[4px] border border-gray-500 px-5 py-[9px]"
        placeholder={placeholder}
        onChange={handleChange}
        value={searchText}
      />
      <AiOutlineSearch className="absolute right-4 shrink-0" size={20} />
    </div>
  );
}
