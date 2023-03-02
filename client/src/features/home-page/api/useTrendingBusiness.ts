import { IBusiness } from '@destiny/common/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import useCreateApi from 'src/api/useCreateApi';

interface Response {
  status: string;
  documentCount: number;
  data: IBusiness[];
}

const getTrendingBusiness = async (api: AxiosInstance) => {
  const response = await api.get<Response>(`/business/trending`);
  return response.data;
};

export default function useTrendingBusiness() {
  const api = useCreateApi();

  const query = useQuery({
    queryKey: ['businesses', 'trending'],
    queryFn: () => getTrendingBusiness(api),
  });

  return query;
}
