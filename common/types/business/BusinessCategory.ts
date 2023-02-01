export const businessCategories = [
  {
    name: 'food and drinks',
    subcategories: ['resturant', 'cafe', 'fast food', 'hotel', 'bakery'],
    features: [
      'outdoors',
      'takeout',
      'homedelivery',
      'finedining',
      'kids friendly',
      'good parking',
    ],
  },
  {
    name: 'sports and fitness',
    subcategories: ['gym', 'futsal', 'tennis', 'zumba', 'swimming'],
    features: [
      'memberships',
      'good parking',
      'allows refunds',
      'open on weekends',
    ],
  },
  {
    name: 'home services',
    subcategories: ['plumbing', 'electricity', 'cleaning', 'repairs'],
    features: ['feature1', 'feature2'],
  },
  {
    name: 'others',
    subcategories: ['entertainment', 'shopping', 'essential', 'vehicles'],
    features: ['feature3', 'feature4'],
  },
] as const;

type BusinessCategories = typeof businessCategories;

export type BusinessCategory = BusinessCategories[number]['name'];
