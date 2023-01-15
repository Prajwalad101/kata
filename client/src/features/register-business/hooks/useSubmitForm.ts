import { IBusiness } from '@destiny/common/types';
import axios from 'axios';
import { useMutation } from 'react-query';

interface Data {
  data: IBusiness;
  status: string;
}

function useSubmitForm() {
  const mutation = useMutation((newBusiness: FormData) =>
    axios.post<Data>(
      `${process.env.NEXT_PUBLIC_HOST}/api/business`,
      newBusiness
    )
  );
  return mutation;
}

export default useSubmitForm;
