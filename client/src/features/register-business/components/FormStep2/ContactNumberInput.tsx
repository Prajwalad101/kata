import { Control, UseFormRegister, useFormState } from 'react-hook-form';
import { FieldLayout } from '../../layouts';
import { FormInputs } from '../../layouts/FormContainer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MyInput from '../MyInput/MyInput';
import MyLabel from '../MyLabel/MyLabel';

interface ContactNumberProps {
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
}

export default function ContactNumberInput({
  register,
  control,
}: ContactNumberProps) {
  const { errors } = useFormState({ control, name: 'contactNumber' });

  return (
    <FieldLayout>
      <MyLabel
        name="contact number"
        sublabel="Provide your business contact number"
      />
      <div>
        <MyInput
          {...register('contactNumber', {
            required: 'Contact number is required',
            pattern: {
              value: /^\d+$/,
              message: 'Contact number is not valid',
            },
            maxLength: { value: 10, message: 'Phone number is not valid' },
            minLength: { value: 10, message: 'Phone number is not valid' },
          })}
          error={errors.contactNumber}
          type="text"
          className="mb-2"
        />
        <ErrorMessage
          error={errors.contactNumber}
          validate={['required', 'validate', 'minLength', 'maxLength']}
        />
      </div>
    </FieldLayout>
  );
}
