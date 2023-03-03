import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import useCreateApi from 'src/api/useCreateApi';

async function sendMail(data: MutationProps, api: AxiosInstance) {
  const response = await api.post('/mail', data);
  return response.data;
}

interface MutationProps {
  subject: string;
  message: string;
  receiverEmail: string;
}

export default function useSendMail() {
  const api = useCreateApi();

  const mutation = useMutation({
    mutationFn: (data: MutationProps) => sendMail(data, api),
  });
  return mutation;
}
