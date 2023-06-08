import { Control, UseFormRegister, useFormState } from 'react-hook-form';
import FormErrorMessage from 'src/components/FormErrorMessage/FormErrorMessage';
import { FieldLayout } from '../../layouts';
import { FormInputs } from '../../layouts/FormContainer';
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
          {...register('contactNumber')}
          placeholder="9800000000"
          error={errors.contactNumber}
          type="text"
          className="mb-2"
        />
        <FormErrorMessage error={errors.contactNumber} />
      </div>
    </FieldLayout>
  );
}
