import { ValueOf } from '../utils/ValueOf';

const businessSubcategories = {
  resturant: 'resturant',
  cafe: 'cafe',
  fastfood: 'fast food',
  hotel: 'hotel',
  bakery: 'bakery',
  gym: 'gym',
  futsal: 'futsal',
  tennis: 'tennis',
  zumba: 'zumba',
  swimming: 'swimming',
  plumbing: 'plumbing',
  electricity: 'electricity',
  cleaning: 'cleaning',
  repairs: 'repairs',
  entertainment: 'entertainment',
  shopping: 'shopping',
  essential: 'essential',
  vehicle: 'vehicles',
};

export type BusinessSubcategory = ValueOf<typeof businessSubcategories>;
export { businessSubcategories };
