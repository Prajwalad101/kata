import { IReview } from '@destiny/common/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Review extends Omit<IReview, 'business'> {
  business: { name: string; _id: string };
}

interface ResponseData {
  status: string;
  count: number;
  data: Review[];
}

const fetchMostLikedReviews = async () => {
  const response = await axios.get<ResponseData>('/api/reviews/most-liked');
  return response.data.data;
};

export default function useMostLikedReviews() {
  const query = useQuery({
    queryKey: ['reviews', 'most-liked'],
    queryFn: fetchMostLikedReviews,
  });

  return query;
}
