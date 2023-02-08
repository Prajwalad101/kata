import { IBusiness } from '@destiny/common/types';
import { isString } from '@destiny/common/utils';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export type BusinessPage = Pick<
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

interface SearchBusinessResponse {
  status: string;
  documentCount: number;
  page: number;
  data: BusinessPage;
}

export const fetchRecommendBusiness = async (
  params: object
): Promise<SearchBusinessResponse> => {
  const baseURL = process.env.NEXT_PUBLIC_HOST;

  const response = await axios.get(`${baseURL}/api/business`, {
    params,
  });

  return response.data;
};

type UseBusinessesProps = {
  sort: string; // sort items based on this field(eg:-createdAt)
  features: string[]; // filter items based on this property
  enabled?: boolean; // only fetch if true,
};

function useFetchRecommendBusiness(props?: UseBusinessesProps) {
  const {
    query: { subcategory },
  } = useRouter();

  let params = {};
  if (props) {
    params = {
      ...(props.sort && { sort: props.sort }),
      ...(isString(subcategory) && { subcategory }),
      ...(props.features &&
        props.features.length !== 0 && {
          features: props.features.join(','),
        }),
    };
  }

  // if no enabled variable passed, enable automatic refetching
  const isEnabled = props?.enabled === undefined ? true : props.enabled;

  const query = useQuery(
    ['business', params],
    () => fetchRecommendBusiness(params),
    {
      enabled: isEnabled, // only run when the filter button is clicked
      staleTime: 1000 * 10,
    }
  );

  return query;
}

export default useFetchRecommendBusiness;
