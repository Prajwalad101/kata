import { FormInputs } from '@features/register-business/layouts/FormContainer';
import {
  Control,
  Controller,
  UseFormRegister,
  useFormState,
} from 'react-hook-form';
import { FieldLayout } from '../../layouts';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MyInput from '../MyInput/MyInput';
import MyLabel from '../MyLabel/MyLabel';
import SelectCity from './SelectCity';

interface AddressInputProps {
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
  className?: string;
}

export default function AddressInput({ register, control }: AddressInputProps) {
  const { errors } = useFormState({ control, name: 'address' });

  return (
    <FieldLayout>
      <MyLabel
        name="address"
        sublabel="Provide the address and city of your business"
      />
      <div>
        <MyInput
          className="mb-3"
          error={errors.address}
          {...register('address', {
            required: 'Address is required',
            maxLength: { value: 50, message: 'Address is too long' },
            minLength: { value: 5, message: 'Address is too short' },
          })}
          id="address"
          placeholder="eg: Kapan, Baluwakhani"
          type="text"
        />
        <ErrorMessage
          className="mb-3"
          error={errors.address}
          validate={['required', 'maxLength', 'minLength']}
        />
        <Controller
          control={control}
          name="city"
          rules={{ required: 'Please select a city' }}
          render={({ field, fieldState }) => (
            <>
              <SelectCity
                error={fieldState.error}
                selected={field.value}
                onChange={field.onChange}
                className="mb-2 w-48"
              />
              <ErrorMessage error={fieldState.error} validate={['required']} />
            </>
          )}
        />
      </div>
    </FieldLayout>
  );
}
