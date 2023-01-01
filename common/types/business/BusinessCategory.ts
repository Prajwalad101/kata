const businessCategories = {
  foodanddrinks: {
    name: 'food and drinks',
    resturant: 'resturant',
    cafe: 'cafe',
    fastfood: 'fast food',
    hotel: 'hotel',
    bakery: 'bakery',
  },
  sportsandfitness: {
    name: 'sports and fitness',
    gym: 'gym',
    futsal: 'futsal',
    tennis: 'tennis',
    zumba: 'zumba',
    swimming: 'swimming',
  },
  homeandservices: {
    name: 'home',
    plumbing: 'plumbing',
    electricity: 'electricity',
    cleaning: 'cleaning',
    repairs: 'repairs',
  },
  others: {
    name: 'others',
    entertainment: 'entertainment',
    shopping: 'shopping',
    essential: 'essential',
    vehicle: 'vehicles',
  },
} as const;

type BusinessCategories = typeof businessCategories;
export type BusinessCategory =
  BusinessCategories[keyof BusinessCategories]['name'];
