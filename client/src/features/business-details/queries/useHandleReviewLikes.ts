import { IReview } from '@destiny/common/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import useCreateApi from 'src/api/useCreateApi';
import { IUserQuestion, QuestionsResponseData } from './useQuestions';

const handleReviewLikes = async (data: MutationProps, api: AxiosInstance) => {
  const response = await api.patch(`/reviews/${data.reviewId}/likes`, {
    type: data.type,
    userId: data.userId,
  });

  return response;
};

interface MutationProps {
  businessId: string;
  reviewId: string;
  userId: string;
  type: 'increment' | 'decrement';
}

export default function useHandleReviewLikes() {
  const api = useCreateApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: MutationProps) => handleReviewLikes(data, api),
    onMutate: async ({ userId, reviewId, type, businessId }) => {
      await queryClient.cancelQueries({
        queryKey: ['reviews', { business: businessId }],
      });

      // Snapshot the previous value
      const matchedData = queryClient.getQueriesData([
        'reviews',
        { business: businessId },
      ]);

      // matched data is an array containing tuples of [key, value]
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const previousQuestions = matchedData[0][1] as any;

      // Optimistically update to the new value
      queryClient.setQueriesData<IReview[]>(['reviews'], (old) => {
        if (!old) return;

        const oldData = JSON.parse(JSON.stringify(old)) as IReview[];

        // create map to preserve original order of values
        const map = new Map<string, IReview>();
        oldData.forEach((value) => map.set(value._id.toString(), value));

        // review to update
        const reviewToUpdate = map.get(reviewId);
        if (!reviewToUpdate) return;

        // update question fields
        const likedUsers = reviewToUpdate.likes.users;

        if (type === 'increment') {
          likedUsers.push(userId);
          reviewToUpdate.likes.value++;
        } else if (type === 'decrement') {
          const index = likedUsers.indexOf(userId);
          likedUsers.splice(index, 1); // remove user from the array
          reviewToUpdate.likes.value--;
        }

        const updatedData = [...map.values()];
        return updatedData;
      });

      // this is used for rolling back if error occurs
      return previousQuestions;
    },
    onError: (_err, newData, context) => {
      // rollback with previous value
      queryClient.setQueriesData(
        ['reviews', { business: newData.businessId }],
        () => context
      );
      return;
    },
  });

  return mutation;
}
