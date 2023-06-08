import { categoryDropdownData } from 'src/data';
import { classNames } from 'src/utils/tailwind';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown';

// prevent original data from accidently mutating
const categories = [...categoryDropdownData];

interface CategoriesDropdownProps {
  className?: string;
  headingColor?: 'white' | 'black';
}

function CategoriesDropdown({
  headingColor,
  className = '',
}: CategoriesDropdownProps) {
  return (
    <div
      className={classNames('mt-5 hidden gap-5 font-rubik md:flex', className)}
    >
      {categories.map((data, index) => (
        <div key={index}>
          <CategoryDropdown
            headingColor={headingColor}
            name={data.name}
            subcategories={data.subcategories}
          />
        </div>
      ))}
    </div>
  );
}

export default CategoriesDropdown;
