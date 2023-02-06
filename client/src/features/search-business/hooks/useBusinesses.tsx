import { FilterFields, IQueryData } from '@features/search-business/types';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { isString } from 'src/utils/text';

import axios from 'axios';

export const fetchBusinesses = async (params: object) => {
  const baseURL = process.env.NEXT_PUBLIC_HOST;

  const response = await axios.get(`${baseURL}/api/business`, {
    params,
  });

  console.log(response.data);
  return response.data;
};

type UseBusinessesProps = {
  sort: string; // sort items based on this field(eg:-createdAt)
  filters: FilterFields; // filter items based on this property
  fields: string[]; // fields to select when fetching items
  enabled?: boolean; // only fetch if true,
};

function useBusinesses(props?: UseBusinessesProps) {
  const { sort, filters, fields, enabled } = props || {};
  const {
    query: { subcategory },
  } = useRouter();

  const params = {
    sort,
    fields: fields?.join(','),
    ...(isString(subcategory) && { subcategory }),
  };

  // if no enabled variable passed, enable automatic refetching
  const isEnabled = enabled === undefined ? true : enabled;

  const query = useQuery<IQueryData, Error>(
    ['business', sort, filters, fields],
    () => fetchBusinesses(params),
    {
      enabled: isEnabled, // only run when the filter button is clicked
      staleTime: 1000 * 10,
    }
  );

  return query;
}

export default useBusinesses;
