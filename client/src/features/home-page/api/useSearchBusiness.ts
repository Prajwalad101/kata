import { IBusiness } from '@destiny/common/types';
import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import useCreateApi from 'src/api/useCreateApi';

// properties of business returned by the server
type BusinessProperties = '_id' | 'name' | 'location' | 'category';

interface Response {
  status: string;
  documentCount: number;
  data: (Pick<IBusiness, BusinessProperties> & { score: number })[];
}

const searchBusiness = async (
  searchText: string | undefined,
  api: AxiosInstance
): Promise<Response> => {
  const result = await api.get(`/business/search?text=${searchText}`);
  return result.data;
};

export default function useSearchBusiness(searchText: string | undefined) {
  const api = useCreateApi();

  const query = useQuery({
    queryFn: () => searchBusiness(searchText, api),
    queryKey: ['searchBusiness', searchText],
    keepPreviousData: true,
    enabled: !!searchText,
  });
  return query;
}
