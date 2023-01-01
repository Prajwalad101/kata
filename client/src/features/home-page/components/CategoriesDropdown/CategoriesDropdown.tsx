import { categoryDropdownData } from 'src/data';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown';

// prevent original data from accidently mutating
const categories = [...categoryDropdownData];

function CategoriesDropdown() {
  return (
    <div className="mt-5 hidden gap-5 font-rubik md:flex">
      {categories.map((data, index) => (
        <div key={index}>
          <CategoryDropdown
            name={data.name}
            subcategories={data.subcategories}
          />
        </div>
      ))}
    </div>
  );
}

export default CategoriesDropdown;
