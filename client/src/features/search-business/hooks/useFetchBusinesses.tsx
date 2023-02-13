import { isString } from '@destiny/common/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { BusinessPage } from './useFetchRecommendBusiness';

interface SearchBusinessResponse {
  status: string;
  documentCount: number;
  page: number;
  data: BusinessPage;
}

export const fetchBusinesses = async (
  params: object
): Promise<SearchBusinessResponse> => {
  const baseURL = process.env.NEXT_PUBLIC_HOST;

  const response = await axios.get(`${baseURL}/api/business`, {
    params,
  });

  return response.data;
};

type UseFetchBusinessesProps = {
  sort: string; // sort items based on this field(eg:-createdAt)
  features: string[]; // filter items based on this property
};

function useFetchBusinesses(props?: UseFetchBusinessesProps) {
  const {
    query: { name },
  } = useRouter();

  let params = {};
  if (props) {
    params = {
      ...(props.sort && { sort: props.sort }),
      ...(isString(name) && { subcategory: name }),
      ...(props.features &&
        props.features.length !== 0 && {
          features: props.features.join(','),
        }),
    };
  }

  // if no enabled variable passed, enable automatic refetching

  const query = useInfiniteQuery(
    ['business', params],
    ({ pageParam = 1 }) => {
      return fetchBusinesses({ ...params, page: pageParam });
    },
    {
      staleTime: 1000 * 10,
      getNextPageParam: (lastPage) =>
        lastPage.documentCount === 0 ? undefined : lastPage.page + 1,
    }
  );

  return query;
}

export default useFetchBusinesses;
