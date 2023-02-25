import { IUser } from '@destiny/common/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import { useRouter } from 'next/router';
import useCreateApi from 'src/api/useCreateApi';
import { QuestionsResponseData } from './useQuestions';

interface Response {
  _id: string;
  author: IUser;
  replies: { _id: string; reply: string; likes: number; author: IUser }[];
}

const submitReply = async (data: MutationProps, api: AxiosInstance) => {
  const response = await api.post<Response>('/questions/reply', data);
  return response.data;
};

interface MutationProps {
  questionId: string;
  author: string;
  reply: string;
}

export default function useSubmitReply() {
  const api = useCreateApi();
  const queryClient = useQueryClient();

  const businessId = useRouter().query.businessId;

  const mutation = useMutation({
    mutationFn: (data: MutationProps) => submitReply(data, api),
    onSuccess: (newData, variables) => {
      queryClient.setQueriesData<QuestionsResponseData>(
        ['questions', { business: businessId }],
        (oldData) => {
          if (!oldData) return undefined;

          // find which question the reply belongs to
          const newQuestion = oldData.data.find(
            (data) => data._id.toString() === variables.questionId
          );
          if (!newQuestion) return undefined;

          const oldQuestions = oldData.data.filter(
            (data) => data._id.toString() !== variables.questionId
          );

          // add new reply to the replies list
          newQuestion.replies = newData.replies;

          // merge newQuestion with old data
          const updatedData = {
            ...oldData,
            data: [newQuestion, ...oldQuestions],
          };

          console.log('updatedData', updatedData);

          return updatedData;
        }
      );
    },
  });

  return mutation;
}
