import { IReview } from '@destiny/common/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import { useRouter } from 'next/router';
import useCreateApi from 'src/api/useCreateApi';

interface ReviewResponse {
  data: IReview[];
  documentCount: number;
  status: string;
}

async function fetchReviews(params: object, api: AxiosInstance) {
  const response = await api.get<ReviewResponse>('/reviews', { params });
  return response.data.data;
}

export default function useReviews(queryParams: object) {
  const router = useRouter();
  const business = router.query.businessId;

  const api = useCreateApi();

  const params = { ...queryParams, business };

  const query = useQuery(
    ['reviews', params],
    () => fetchReviews(queryParams, api),
    { staleTime: 1000 * 10 }
  );

  return query;
}
