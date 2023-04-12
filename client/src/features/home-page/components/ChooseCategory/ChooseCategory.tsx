import { useRouter } from 'next/router';
import { categoryDropdownData } from 'src/data';

const categories = [...categoryDropdownData].map((category) => ({
  name: category.name,
  icon: category.icon,
}));

export default function ChooseCategory() {
  const router = useRouter();

  const handleNavigation = (categoryName: string) => {
    // TODO: city is static, change later
    router.push(`/search/business?category=${categoryName}&city=Kathmandu`);
  };

  return (
    <div className="mb-16">
      <h4 className="mb-8 text-center text-2xl font-medium text-gray-700">
        Choose Categories
      </h4>
      <div className="flex flex-wrap justify-evenly gap-x-5 gap-y-8">
        {categories.map((value, index) => (
          <div
            onClick={() => handleNavigation(value.name)}
            className="flex min-w-[200px] cursor-pointer flex-col items-center gap-y-5 rounded-md border-2 border-gray-300 py-5 text-gray-700 shadow-md transition-all hover:scale-110 hover:border-primaryred hover:bg-primaryred hover:text-white"
            key={index}
          >
            {value.icon}
            <p className="capitalize">{value.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
