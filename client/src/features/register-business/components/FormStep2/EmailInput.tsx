import { FieldLayout } from '@features/register-business/layouts';
import { Control, UseFormRegister, useFormState } from 'react-hook-form';
import { FormInputs } from '../../layouts/FormContainer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MyInput from '../MyInput/MyInput';
import MyLabel from '../MyLabel/MyLabel';

interface EmailInputProps {
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
}

export default function EmailInput({ register, control }: EmailInputProps) {
  const { errors } = useFormState({ control, name: 'email' });

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <FieldLayout>
      <MyLabel
        name="email"
        sublabel="Provide the email address of your business"
      />
      <div>
        <MyInput
          {...register('email', {
            validate: (value) =>
              validateEmail(value) || 'Email address is not valid',
          })}
          type="email"
          error={errors.email}
          className="mb-2"
        />
        <ErrorMessage error={errors.email} validate={['validate']} />
      </div>
    </FieldLayout>
  );
}
