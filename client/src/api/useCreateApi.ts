import axios from 'axios';
import useCookie from 'src/hooks/browser/useCookie';

export default function useCreateApi() {
  const accessToken = useCookie('access-token', null);

  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_HOST}/api`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return api;
}
