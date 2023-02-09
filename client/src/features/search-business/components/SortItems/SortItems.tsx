import sortItemData from '@features/search-business/data/sortItemData';
import ReactSelect from 'react-select';

export interface SortItemsProps {
  selectedSort: string;
  setSelectedSort: (_sortItem: string) => void;
}

const sortOptions = sortItemData.map((item) => ({
  label: item.name,
  value: item.sortField,
}));

function SortItems({ selectedSort, setSelectedSort }: SortItemsProps) {
  return (
    <div className="flex shrink-0 items-center gap-4 font-rubik">
      <p className="text-secondarytext">Sort By:</p>
      <ReactSelect
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
      />
    </div>
  );
}

export default SortItems;
