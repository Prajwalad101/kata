import { IQuestion } from "@destiny/common/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import useCreateApi from "src/api/useCreateApi";

interface ResponseData {
  status: string;
  data: IQuestion
}

const submitQuestion = async (payload: MutationProps, api: AxiosInstance) => {
  const response = await api.post<ResponseData>('/questions', payload)
  return response.data.data
}

interface MutationProps {
  author: string;
  business: string 
  question: string;
}

export default function useSubmitQuestion(){
  const queryClient = useQueryClient();
  const api = useCreateApi();

  const mutation = useMutation({
    mutationFn: (payload: MutationProps) => submitQuestion(payload, api),
    onSuccess: (newQuestion) => {
      queryClient.setQueriesData<IQuestion[]>(
        ['questions', { business: newQuestion.business }],
        (oldData) => {
          if(!oldData) return [newQuestion]
          const updatedData = [...oldData, newQuestion]
          return updatedData
        }
      )
  }
  })

  return mutation

} 
