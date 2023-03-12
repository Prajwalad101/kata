import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import useCreateApi from 'src/api/useCreateApi';
import { QuestionsResponseData, IUserQuestion } from './useQuestions';

interface ResponseData {
  status: string;
  data: IUserQuestion;
}

const submitQuestion = async (payload: MutationProps, api: AxiosInstance) => {
  const response = await api.post<ResponseData>('/questions', payload);

  return response.data.data;
};

interface MutationProps {
  author: string;
  business: string;
  question: string;
}

export default function useSubmitQuestion() {
  const queryClient = useQueryClient();
  const api = useCreateApi();

  const mutation = useMutation({
    mutationFn: (payload: MutationProps) => submitQuestion(payload, api),
    onSuccess: (newQuestion) => {
      queryClient.setQueriesData<QuestionsResponseData>(
        ['questions', { business: newQuestion.business }],
        (oldData) => {
          if (!oldData) {
            return { status: 'success', documentCount: 1, data: [newQuestion] };
          }

          const updatedData = {
            ...oldData,
            documentCount: oldData.documentCount + 1,
            data: [newQuestion, ...oldData.data],
          };
          return updatedData;
        }
      );
    },
  });

  return mutation;
}
