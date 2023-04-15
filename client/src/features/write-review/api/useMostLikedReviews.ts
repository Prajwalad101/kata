import { IReview } from '@destiny/common/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import useCreateApi from 'src/api/useCreateApi';

export interface Review extends Omit<IReview, 'business'> {
  business: { name: string; _id: string };
}

interface ResponseData {
  status: string;
  count: number;
  data: Review[];
}

const fetchMostLikedReviews = async (api: AxiosInstance) => {
  const response = await api.get<ResponseData>('/reviews/most-liked');
  return response.data.data;
};

export default function useMostLikedReviews() {
  const api = useCreateApi();

  const query = useQuery({
    queryKey: ['reviews', 'most-liked'],
    queryFn: () => fetchMostLikedReviews(api),
  });

  return query;
}
