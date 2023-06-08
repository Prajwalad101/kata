import { IReview } from '@destiny/common/types';
import { isString } from '@destiny/common/utils';
import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import { useRouter } from 'next/router';
import useCreateApi from 'src/api/useCreateApi';

interface IResponse {
  status: string;
  documentCount: string;
  data: IReview[];
}

const fetchUserReviews = async (
  userId: string | undefined,
  api: AxiosInstance
) => {
  const response = await api.get<IResponse>(`reviews?author=${userId}`);
  return response.data;
};

export default function useUserReviews() {
  const router = useRouter();
  const { id } = router.query;

  const api = useCreateApi();

  const enabled = isString(id);
  const userId = isString(id) ? id : undefined;

  const query = useQuery({
    queryKey: ['reviews', 'user', userId],
    queryFn: () => fetchUserReviews(userId, api),
    enabled,
  });

  return query;
}
