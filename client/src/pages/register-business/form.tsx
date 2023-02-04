import { Navbar } from '@features/register-business/components';
import SuccessfulRegister from '@features/register-business/components/SuccessfulRegister/SuccessfulRegister';
import { useSubmitForm } from '@features/register-business/hooks';
import { FormContainer } from '@features/register-business/layouts';
import { QueryProvider } from 'src/components/context-provider';
import AppLayout from 'src/components/layout/app/AppLayout';
import { NextPageWithLayout } from 'src/pages/_app';

const Form: NextPageWithLayout = () => {
  const submitFormMutation = useSubmitForm();

  return (
    <>
      {submitFormMutation.isSuccess ? (
        <SuccessfulRegister />
      ) : (
        <FormContainer mutation={submitFormMutation} />
      )}
    </>
  );
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
