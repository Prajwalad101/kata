import { IBusiness } from '@destiny/common/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import useCreateApi from 'src/api/useCreateApi';

interface Response {
  status: string;
  documentCount: number;
  data: IBusiness[];
}

const getHighestRatedBusiness = async (
  coordinates: [number, number] | null,
  api: AxiosInstance
) => {
  const response = await api.get<Response>('/business/highest-rated', {
    params: { coordinates },
  });
  return response.data;
};

export default function useHighestRatedBusiness(
  coordinates: [number, number] | null
) {
  const api = useCreateApi();

  const query = useQuery({
    queryKey: ['businesses', 'highest-rated'],
    queryFn: () => getHighestRatedBusiness(coordinates, api),
    enabled: !!coordinates,
  });

  return query;
}
