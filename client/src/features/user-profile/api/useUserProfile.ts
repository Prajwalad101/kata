import { IUser } from '@destiny/common/types';
import { isString } from '@destiny/common/utils';
import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import { useRouter } from 'next/router';
import useCreateApi from 'src/api/useCreateApi';

const fetchUserProfile = async (
  userId: string | undefined,
  api: AxiosInstance
) => {
  const response = await api.get<IUser>(`/users/${userId}`);
  return response.data;
};

export default function useUserProfile() {
  const router = useRouter();
  const { id } = router.query;

  // only fetch if userId exists
  const enabled = isString(id);

  const api = useCreateApi();
  const userId = isString(id) ? id : undefined;

  const query = useQuery({
    queryKey: ['userprofile', id],
    queryFn: () => fetchUserProfile(userId, api),
    enabled,
  });
  return query;
}
