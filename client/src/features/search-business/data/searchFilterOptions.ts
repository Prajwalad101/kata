// import { BusinessSubcategory } from '@destiny/common/types';

// type SearchFilterOptions = { [_type in BusinessSubcategory]: IFilterByOptions };

// const searchFilterOptions: Partial<SearchFilterOptions> = {
const searchFilterOptions = {
  resturant: {
    price: ['cheap', 'medium', 'high', 'exclusive'],
    suggested: ['delivery', 'reservations', 'events'],
    popular: ['good for kids', 'live music', 'outdoor dining'],
    // distance: ['walking (300m)', 'biking (1km)', 'driving (5km)', 'same city'],
  },
};

export default searchFilterOptions;
