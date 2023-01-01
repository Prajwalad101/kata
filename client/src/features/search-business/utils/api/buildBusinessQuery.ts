import { IBusiness } from '@destiny/common/types';

export function buildBusinessQuery(
  sortField: string | undefined,
  filters: Pick<IBusiness, 'features' | 'price' | 'subCategory'> | undefined,
  fields: string[] | undefined
) {
  let sortQuery = '',
    priceQuery = '',
    featuresQuery = '',
    fieldsQuery = '',
    subcategoryQuery = '';

  if (sortField) {
    sortQuery = `sort=${sortField}`; // sortField is always defined
  }

  if (filters) {
    priceQuery = `&price=${filters.price}`;
    subcategoryQuery = `&subCategory=${filters.subCategory}`;

    // features can be an empty array
    if (filters.features.length !== 0) {
      const features = filters.features?.join(',');
      featuresQuery = `&features=${features}`;
    }
  }

  if (fields) {
    fieldsQuery = '&fields=' + fields.join(',');
  }

  // sort=-avgRating&price=cheap&features=delivery,events
  const apiQuery = ''.concat(
    sortQuery,
    priceQuery,
    featuresQuery,
    fieldsQuery,
    subcategoryQuery
  );

  return apiQuery;
}
