import { IBusiness } from '@destiny/common/types';
import { isString } from '@destiny/common/utils';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export type SearchBusinessResponse = Pick<
  IBusiness,
  | '_id'
  | 'avgRating'
  | 'images'
  | 'location'
  | 'name'
  | 'rating_count'
  | 'reviews'
  | 'total_rating'
>[];

export const fetchBusinesses = async (
  params: object
): Promise<SearchBusinessResponse> => {
  const baseURL = process.env.NEXT_PUBLIC_HOST;

  const response = await axios.get(`${baseURL}/api/business`, {
    params,
  });

  console.log(response.data);
  return response.data.data;
};

type UseBusinessesProps = {
  sort: string; // sort items based on this field(eg:-createdAt)
  features: string[]; // filter items based on this property
  enabled?: boolean; // only fetch if true,
};

function useBusinesses(props: UseBusinessesProps) {
  const { sort, features, enabled } = props;
  const {
    query: { subcategory },
  } = useRouter();

  const params = {
    sort,
    ...(isString(subcategory) && { subcategory }),
    ...(features.length !== 0 && {
      features: features.join(','),
    }),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const featuresQueryKey = {} as any;
  features.forEach((feature) => (featuresQueryKey[feature] = true));

  // if no enabled variable passed, enable automatic refetching
  const isEnabled = enabled === undefined ? true : enabled;

  const query = useQuery(
    ['business', sort, featuresQueryKey],
    () => fetchBusinesses(params),
    {
      enabled: isEnabled, // only run when the filter button is clicked
      staleTime: 1000 * 10,
    }
  );

  return query;
}

export default useBusinesses;
