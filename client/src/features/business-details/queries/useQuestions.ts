import { IQuestion } from "@destiny/common/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useRouter } from "next/router";
import useCreateApi from "src/api/useCreateApi";

export interface QuestionsResponseData {
  status: string;
  documentCount: number;
  data: IQuestion[]
}

const getQuestions = async (params: object, api: AxiosInstance) => {
  const response = await api.get<QuestionsResponseData>('/questions', {
    params
  }); 
  return response.data;
}

export default function useQuestions(queryParams: object){
  const business = useRouter().query.businessId;
  const newParams = {...queryParams, business};

  const api = useCreateApi();

  const query = useQuery({
    queryKey: ['questions', newParams],
    queryFn: () => getQuestions(newParams, api),
  },
  )
  return query
}
