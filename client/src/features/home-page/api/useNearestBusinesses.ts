import { IBusiness } from '@destiny/common/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import useCreateApi from 'src/api/useCreateApi';

interface Response {
  status: string;
  documentCount: number;
  data: IBusiness[];
}

const getNearestBusiness = async (
  coordinates: [number, number] | undefined,
  api: AxiosInstance
) => {
  const response = await api.get<Response>('/business/nearest', {
    params: { coordinates },
  });
  return response.data;
};

export default function useNearestBusiness(
  coordinates: [number, number] | undefined
) {
  const api = useCreateApi();

  const query = useQuery({
    queryKey: ['businesses', 'nearest'],
    queryFn: () => getNearestBusiness(coordinates, api),
    enabled: !!coordinates,
  });

  return query;
}
