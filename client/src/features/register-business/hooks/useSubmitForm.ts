import { IBusiness } from '@destiny/common/types';
import { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';
import useCreateApi from 'src/api/useCreateApi';

export interface SubmitFormResponse {
  data: IBusiness;
  status: string;
}

const submitBusinessForm = async (
  newBusiness: FormData,
  api: AxiosInstance
): Promise<SubmitFormResponse> => {
  const result = await api.post('/business', newBusiness);
  console.log(result.data);

  return result.data;
};

function useSubmitForm() {
  const api = useCreateApi();

  const mutation = useMutation({
    mutationFn: (newBusiness: FormData) => submitBusinessForm(newBusiness, api),
  });
  return mutation;
}

export default useSubmitForm;
