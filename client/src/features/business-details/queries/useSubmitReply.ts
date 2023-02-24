import { IQuestion } from '@destiny/common/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import useCreateApi from 'src/api/useCreateApi';
import { QuestionsResponseData } from './useQuestions';

interface ResponseData {
  status: string;
  data: IQuestion;
}

const submitReply = async (data: MutationProps, api: AxiosInstance) => {
  const response = await api.post<ResponseData>('/questions/reply', data);
  return response.data.data;
};

interface MutationProps {
  id: string;
  author: string;
  reply: string;
}

export default function useSubmitReply() {
  const api = useCreateApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: MutationProps) => submitReply(data, api),
    onSuccess: (newQuestion) => {
      queryClient.setQueriesData<QuestionsResponseData>(
        ['questions', { business: newQuestion._id }],
        (oldData) => {
          if (!oldData) return undefined;

          const updatedData = {
            ...oldData,
            data: [newQuestion, ...oldData.data],
          };
          return updatedData;
        }
      );
    },
  });

  return mutation;
}
