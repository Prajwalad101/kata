import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import useCreateApi from 'src/api/useCreateApi';
import { IUserQuestion, QuestionsResponseData } from './useQuestions';

const handleQuestionLikes = async (data: MutationProps, api: AxiosInstance) => {
  const response = await api.patch(`/questions/${data.questionId}`, {
    type: data.type,
    userId: data.userId,
  });

  return response;
};

interface MutationProps {
  businessId: string;
  questionId: string;
  userId: string;
  type: 'increment' | 'decrement';
}

export default function useHandleQuestionLikes() {
  const api = useCreateApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: MutationProps) => handleQuestionLikes(data, api),
    onMutate: async ({ userId, questionId, type, businessId }) => {
      await queryClient.cancelQueries({
        queryKey: ['questions', { business: businessId }],
      });

      // Snapshot the previous value
      const matchedData = queryClient.getQueriesData([
        'questions',
        { business: businessId },
      ]);

      // matched data is an array containing tuples of [key, value]
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const previousQuestions = matchedData[0][1] as any;

      // Optimistically update to the new value
      queryClient.setQueriesData<QuestionsResponseData>(
        ['questions'],
        (old) => {
          if (!old) return;

          // create map to preserve original order of values
          const map = new Map<string, IUserQuestion>();
          old.data.forEach((value) => map.set(value._id.toString(), value));

          // question to update
          const questionToUpdate = map.get(questionId);
          if (!questionToUpdate) return;

          // update question fields
          const likedUsers = questionToUpdate.likes.users;

          if (type === 'increment') {
            likedUsers.push(userId);
            questionToUpdate.likes.value++;
          } else if (type === 'decrement') {
            const index = likedUsers.indexOf(userId);
            likedUsers.splice(index, 1); // remove user from the array
            questionToUpdate.likes.value--;
          }

          const updatedData = { ...old, data: [...map.values()] };
          return updatedData;
        }
      );

      // this is used for rolling back if error occurs
      return previousQuestions;
    },
    onError: (_err, newData, context) => {
      // rollback with previous value
      queryClient.setQueriesData(
        ['questions', { business: newData.businessId }],
        () => context
      );
      return;
    },
  });

  return mutation;
}
