import { IBusiness, IReview } from '@destiny/common/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import useCreateApi from 'src/api/useCreateApi';

interface Response {
  status: string;
  data: IReview;
}

async function postReview(reviewData: FormData, api: AxiosInstance) {
  const response = await api.post<Response>('/reviews', reviewData);
  return response.data.data;
}

export default function useSubmitReview() {
  const queryClient = useQueryClient();
  const api = useCreateApi();

  return useMutation((reviewForm: FormData) => postReview(reviewForm, api), {
    onSuccess(newReview) {
      queryClient.setQueryData<IReview[]>(['reviews'], (oldData) => {
        if (!oldData) return [newReview]; // if no data, return new data
        return [newReview, ...oldData];
      });

      queryClient.setQueryData<IBusiness>(
        ['business', newReview.business],
        (data) => {
          if (!data) return undefined;
          // deep clone object
          const prevData = JSON.parse(JSON.stringify(data)) as IBusiness;
          const ratingIndex = newReview.rating - 1;

          prevData.ratings[ratingIndex] += 1;
          return prevData;
        }
      );
    },
  });
}
