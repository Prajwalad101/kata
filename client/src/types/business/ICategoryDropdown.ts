import { ISubcategoryDropdown } from 'src/types/business';

export interface ICategoryDropdown {
  name: string;
  icon?: JSX.Element;
  subcategories: ISubcategoryDropdown[];
}
