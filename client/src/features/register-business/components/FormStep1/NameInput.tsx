import { Control, UseFormRegister, useFormState } from 'react-hook-form';
import { FieldLayout } from '../../layouts';
import { FormInputs } from '../../layouts/FormContainer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MyInput from '../MyInput/MyInput';
import MyLabel from '../MyLabel/MyLabel';

interface NameInputProps {
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
  className?: string;
}

export default function NameInput({ register, control }: NameInputProps) {
  const { errors } = useFormState({ control, name: 'name' });

  return (
    <FieldLayout>
      <MyLabel
        name="business name"
        sublabel="Provide the full name of your business"
      />
      <div>
        <MyInput
          error={errors.name}
          {...register('name', {
            required: 'Business name is required',
            maxLength: { value: 50, message: 'Business name is too long' },
            minLength: { value: 4, message: 'Business name is too short' },
          })}
          id="business name"
          placeholder="eg: The Burger House"
          type="text"
          className="mb-2"
        />
        <ErrorMessage
          error={errors.name}
          validate={['required', 'maxLength', 'minLength']}
        />
      </div>
    </FieldLayout>
  );
}
