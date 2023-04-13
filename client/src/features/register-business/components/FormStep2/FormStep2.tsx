import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { classNames } from 'src/utils/tailwind';
import { FormInputs } from '../../layouts/FormContainer';
import ContactNumberInput from './ContactNumberInput';
import DirectionsInput from './DirectionsInput';
import EmailInput from './EmailInput';
import GeoLocationInput from './GeolocationInput';

interface FormStep2Props {
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
  setValue: UseFormSetValue<FormInputs>;
  className?: string;
}
export default function FormStep2({
  register,
  control,
  setValue,
  className = '',
}: FormStep2Props) {
  return (
    <div className={classNames(className)}>
      <EmailInput register={register} control={control} />
      <ContactNumberInput register={register} control={control} />
      <GeoLocationInput control={control} setValue={setValue} />
      <DirectionsInput register={register} control={control} />
    </div>
  );
}
