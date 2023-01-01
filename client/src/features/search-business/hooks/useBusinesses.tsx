import { FilterFields, IQueryData } from '@features/search-business/types';
import {
  buildBusinessQuery,
  fetchBusinesses,
} from '@features/search-business/utils/api';
import { useQuery } from 'react-query';

type Props = {
  sort: string; // sort items based on this field(eg:-createdAt)
  filters: FilterFields; // filter items based on this property
  fields: string[]; // fields to select when fetching items
  enabled: boolean; // only fetch if true,
};

function useBusinesses(props?: Partial<Props>) {
  const { sort, filters, fields, enabled } = props || {};

  const queryURL = buildBusinessQuery(sort, filters, fields);

  // if no enabled variable passed, enable automatic refetching
  const isEnabled = enabled === undefined ? true : enabled;

  const query = useQuery<IQueryData, Error>(
    ['business', sort, filters, fields],
    () => fetchBusinesses(queryURL),
    {
      enabled: isEnabled, // only run when the filter button is clicked
      staleTime: 1000 * 10,
    }
  );

  return query;
}

export default useBusinesses;
