import { IReview } from '@destiny/common/types';
import { ReviewQueryParams } from '@features/business-details/types';
import { useQuery } from 'react-query';

export default function useReviews(queryParams?: ReviewQueryParams) {
  // sort ratings array because order of keys in an array matters
  // modifying ratings from [1,2] to [2,1] should not trigger a refetch
  const inFilters = queryParams?.filters?.in;

  inFilters?.rating && inFilters.rating.sort((a, b) => b - a);

  const query = useQuery(
    ['reviews', queryParams?.filters?.match?.business, queryParams],
    () => fetchReviews(queryParams),
    { staleTime: 1000 * 10 }
  );

  return query;
}

async function fetchReviews(
  queryParams?: ReviewQueryParams
): Promise<IReview[]> {
  const URL = buildQueryURL(queryParams);

  const response = await fetch(URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
}

function buildQueryURL(queryParams?: ReviewQueryParams) {
  let URL = `${process.env.NEXT_PUBLIC_HOST}/api/reviews?`;

  if (!queryParams) return URL.replace('?', '');

  if (queryParams.filters) {
    const filters = queryParams.filters;

    if (filters.match) {
      const match = filters.match;
      const matchKeys = Object.keys(match) as (keyof typeof match)[];
      matchKeys.forEach((key) => {
        if (match[key]) {
          URL += `&${key}=${match[key]}`;
        }
      });
    }

    // don't loop over match object
    let filterKeys = Object.keys(filters) as (keyof typeof filters)[];
    filterKeys = filterKeys.filter((key) => key !== 'match');

    filterKeys.forEach((filterKey) => {
      const filterObj = filters[filterKey];
      if (filterObj) {
        const fields = Object.keys(filterObj) as (keyof typeof filterObj)[];
        fields.forEach((field) => {
          const value = filterObj[field];
          if (value) {
            // if value is an array, also check it's length
            if (Array.isArray(value)) {
              if (value.length !== 0) {
                URL += `&${field}[${filterKey}]=${JSON.stringify(
                  filterObj[field]
                )}`;
              }
            } else {
              URL += `&${field}[${filterKey}]=${filterObj[field]}`;
            }
          }
        });
      }
    });
  }

  if (queryParams?.sort) {
    URL += `&sort=${queryParams.sort}`;
  }

  return URL.replaceAll('?&', '?');
}
