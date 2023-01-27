import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import useCreateApi from 'src/api/useCreateApi';

const searchBusiness = (searchText: string | undefined, api: AxiosInstance) => {
  const result = api.get(`/business/search?text=${searchText}`);
  return result;
};

export default function useSearchBusiness(searchText: string | undefined) {
  const api = useCreateApi();

  const query = useQuery({
    queryFn: () => searchBusiness(searchText, api),
    queryKey: ['searchBusiness', searchText],
    enabled: !!searchText,
  });
  return query;
}
