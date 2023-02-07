export const businessCategories = [
  {
    name: 'food and drinks',
    subcategories: ['resturant', 'cafe', 'fast food', 'hotel', 'bakery'],
    features: [
      { value: 'outdoors', tag: 'suggested' },
      { value: 'takeout', tag: 'popular' },
      { value: 'homedelivery', tag: 'suggested' },
      { value: 'finedining', tag: 'suggested' },
      { value: 'kids friendly', tag: 'suggested' },
      { value: 'good parking', tag: 'suggested' },
    ],
  },
  {
    name: 'sports and fitness',
    subcategories: ['gym', 'futsal', 'tennis', 'zumba', 'swimming'],
    features: [
      { value: 'good parking', tag: 'suggested' },
      { value: 'memberships', tag: 'suggested' },
      { value: 'allows refunds', tag: 'suggested' },
      { value: 'open on weekends', tag: 'suggested' },
    ],
  },
  {
    name: 'home services',
    subcategories: ['plumbing', 'electricity', 'cleaning', 'repairs'],
    features: [
      { value: 'feature1', tag: 'suggested' },
      { value: 'feature2', tag: 'suggested' },
    ],
  },
  {
    name: 'others',
    subcategories: ['entertainment', 'shopping', 'essential', 'vehicles'],
    features: [
      { value: 'feature3', tag: 'suggested' },
      { value: 'feature4', tag: 'suggested' },
    ],
  },
] as const;

type BusinessCategories = typeof businessCategories;

export type BusinessCategory = BusinessCategories[number]['name'];
