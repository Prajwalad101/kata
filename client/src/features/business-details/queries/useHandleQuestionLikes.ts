import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import useCreateApi from 'src/api/useCreateApi';
import { IUserQuestion, QuestionsResponseData } from './useQuestions';

const handleQuestionLikes = async (data: MutationProps, api: AxiosInstance) => {
  const response = await api.patch(`/questions/${data.questionId}`, {
    type: data.type,
  });

  return response;
};

interface MutationProps {
  businessId: string;
  questionId: string;
  type: 'increment' | 'decrement';
}

export default function useHandleQuestionLikes() {
  const api = useCreateApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: MutationProps) => handleQuestionLikes(data, api),
    onMutate: async ({ questionId, type, businessId }) => {
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

      // console.log('Previous questions', previousQuestions);

      /* if (mutationData.type === 'increment') {
        updatedQuestion.likes += 1;
      }
      if (mutationData.type === 'decrement') {
        updatedQuestion.likes -= 1;
      } */

      // Optimistically update to the new value
      queryClient.setQueriesData<QuestionsResponseData>(
        ['questions'],
        (old) => {
          if (!old) return;

          // create map to preserve original order of questions
          const map = new Map<string, IUserQuestion>();
          old.data.forEach((value) => map.set(value._id.toString(), value));

          // question to update
          const newQuestion = map.get(questionId);
          if (!newQuestion) return;

          // increment or decrement likes
          map.set(questionId, {
            ...newQuestion,
            likes:
              type === 'increment'
                ? newQuestion.likes + 1
                : newQuestion.likes - 1,
          });

          const updatedData = { ...old, data: [...map.values()] };
          return updatedData;
        }
      );

      // this is used for rolling back if error occurs
      return previousQuestions;
    },
  });

  return mutation;
}
