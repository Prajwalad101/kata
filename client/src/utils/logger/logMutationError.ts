import axios from 'axios';

export default function logMutationError(error: unknown) {
  // only log on development environments
  if (process.env.NEXT_PUBLIC_ENV !== 'development') return;

  if (axios.isAxiosError(error)) {
    console.error(error.response?.data);
  }
}
