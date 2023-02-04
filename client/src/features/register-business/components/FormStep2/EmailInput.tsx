import { FieldLayout } from '@features/register-business/layouts';
import { Control, UseFormRegister, useFormState } from 'react-hook-form';
import FormErrorMessage from 'src/components/FormErrorMessage/FormErrorMessage';
import { FormInputs } from '../../layouts/FormContainer';
import MyInput from '../MyInput/MyInput';
import MyLabel from '../MyLabel/MyLabel';

interface EmailInputProps {
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
}

export default function EmailInput({ register, control }: EmailInputProps) {
  const { errors } = useFormState({ control, name: 'email' });

  return (
    <FieldLayout>
      <MyLabel
        name="email"
        sublabel="Provide the email address of your business"
      />
      <div>
        <MyInput
          {...register('email')}
          placeholder="example@email.com"
          type="email"
          error={errors.email}
        />
        <FormErrorMessage className="mt-2" error={errors.email} />
      </div>
    </FieldLayout>
  );
}
