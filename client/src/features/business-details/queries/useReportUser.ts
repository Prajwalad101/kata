import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import useCreateApi from 'src/api/useCreateApi';

const reportUser = (
  { userId, reportedBy, violations }: MutationProps,
  api: AxiosInstance
) => {
  const response = api.patch(`/users/${userId}/report`, {
    userId,
    reportedBy,
    violations,
  });

  return response;
};

interface MutationProps {
  reportedBy: string;
  userId: string;
  violations: string[];
}

export default function useReportUser() {
  const api = useCreateApi();

  const mutation = useMutation({
    mutationFn: (data: MutationProps) => reportUser(data, api),
  });
  return mutation;
}
