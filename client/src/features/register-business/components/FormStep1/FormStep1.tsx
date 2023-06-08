import { Control, Controller, UseFormRegister } from 'react-hook-form';
import { FormInputs } from '../../layouts/FormContainer';
import AddressInput from './AddressInput';
import DescriptionInput from './DescriptionInput';
import NameInput from './NameInput';
import WorkingDays from './WorkingDays';

interface FormStep1Props {
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
  className?: string;
}

export default function FormStep1({
  control,
  register,
  className = '',
}: FormStep1Props) {
  return (
    <div className={className}>
      <NameInput register={register} control={control} />
      <DescriptionInput register={register} control={control} />
      <AddressInput register={register} control={control} />
      <Controller
        control={control}
        name="workingDays"
        rules={{
          validate: (value) =>
            value.length > 0 || 'Please select at least one working day',
        }}
        render={({ field, fieldState }) => (
          <WorkingDays
            list={field.value}
            onChange={field.onChange}
            error={fieldState.error}
          />
        )}
      />
    </div>
  );
}
