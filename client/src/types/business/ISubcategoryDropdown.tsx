import { BusinessFeature, BusinessSubcategory } from '@destiny/common/types';

// any specific type of business (eg. resturant)
export interface ISubcategoryDropdown {
  name: BusinessSubcategory;
  icon: JSX.Element;
  features: { name: BusinessFeature }[];
}
