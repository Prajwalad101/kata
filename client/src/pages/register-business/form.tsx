import { Navbar } from '@features/register-business/components';
import { useSubmitForm } from '@features/register-business/hooks';
import { FormContainer } from '@features/register-business/layouts';
import { dataToFormData } from '@features/register-business/utils/objects/dataToFormData';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { QueryProvider } from 'src/components/context-provider';
import AppLayout from 'src/components/layout/app/AppLayout';
import { NextPageWithLayout } from 'src/pages/_app';
import { logMutationError } from 'src/utils/logger';

const Form: NextPageWithLayout = () => {
  const mutation = useSubmitForm();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _handleSubmit = (values: any) => {
    const formData = dataToFormData(values);
    mutation.mutate(formData, {
      onSuccess: (data) => {
        router.push(`submit?status=success&id=${data.data.data._id}`, 'submit');
      },
      onError: () => {
        logMutationError(mutation.error);
        router.push('submit?status=error', 'submit');
      },
    });
  };

  // change the cursor style when submitting form
  useEffect(() => {
    if (mutation.isLoading) {
      document.body.style.cursor = 'progress';
    } else {
      document.body.style.cursor = 'default';
    }
  }, [mutation.isLoading]);

  return <FormContainer />;
};

Form.getLayout = (page) => (
  <QueryProvider>
    <AppLayout size="sm">
      <Navbar />
      {page}
    </AppLayout>
  </QueryProvider>
);

export default Form;
