import { ISubcategoryDropdown } from 'src/types/business';

export interface ICategoryDropdown {
  name: string;
  subcategories: ISubcategoryDropdown[];
}
