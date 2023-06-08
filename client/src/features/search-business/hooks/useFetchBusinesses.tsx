import { isString } from '@destiny/common/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios, { AxiosInstance } from 'axios';
import { useRouter } from 'next/router';
import useCreateApi from 'src/api/useCreateApi';
import { BusinessPage } from './useFetchRecommendBusiness';

interface SearchBusinessResponse {
  status: string;
  documentCount: number;
  page: number;
  data: BusinessPage;
}

export const fetchBusinesses = async (params: object, api?: AxiosInstance) => {
  /* if (api) {
    result = await api.get<Response>(`/business/${businessId}`);
  } else {
    result = await axios.get<Response>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/business/${businessId}`
    );
  } */

  let response;
  if (api) {
    response = await api.get<SearchBusinessResponse>('/business', {
      params: {
        ...params,
        // verified: true,
      },
    });
  } else {
    response = await axios.get<SearchBusinessResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/business`,
      {
        params: {
          ...params,
          // verified: true,
        },
      }
    );
  }

  return response.data;
};

type UseFetchBusinessesProps = {
  sort?: string; // sort items based on this field(eg:-createdAt)
  features?: string[]; // filter items based on this property
  coordinates?: [number, number];
};

function useFetchBusinesses(props?: UseFetchBusinessesProps) {
  const {
    query: { name, category },
  } = useRouter();

  const api = useCreateApi();

  let params = {};
  if (props) {
    params = {
      ...(props.sort && { sort: props.sort }),
      ...(isString(name) && { subcategory: name }),
      ...(isString(category) && { category: category }),
      ...(props.features &&
        props.features.length !== 0 && {
          features: props.features.join(','),
        }),
      ...(props.coordinates && { coordinates: props.coordinates }),
    };
  }

  // if no enabled variable passed, enable automatic refetching

  const query = useInfiniteQuery(
    ['business', params],
    ({ pageParam = 1 }) => {
      return fetchBusinesses({ ...params, page: pageParam }, api);
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
