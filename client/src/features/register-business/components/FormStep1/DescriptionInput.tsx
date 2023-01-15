import { Control, UseFormRegister, useFormState } from 'react-hook-form';
import { classNames } from 'src/utils/tailwind';
import { FieldLayout } from '../../layouts';
import { FormInputs } from '../../layouts/FormContainer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MyLabel from '../MyLabel/MyLabel';

interface DescriptionInputProps {
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
  className?: string;
}

export default function DescriptionInput({
  register,
  control,
}: DescriptionInputProps) {
  const { errors } = useFormState({ control, name: 'description' });

  return (
    <FieldLayout>
      <MyLabel
        name="description"
        sublabel="Provide a short summary of your business. Tell the customers about
      the business and include some key features"
      />
      <div>
        <textarea
          id="description"
          rows={7}
          {...register('description', {
            required: 'Description is required',
            maxLength: { value: 200, message: 'Description is too long' },
            minLength: { value: 15, message: 'Description is too short' },
          })}
          className={classNames(
            errors.description ? 'ring-red-500' : 'ring-blue-600',
            'mb-2 w-full rounded-md border-2 border-gray-300 px-4 py-3 outline-none ring-offset-2  transition-all focus:ring-[3px]'
          )}
        />
        <ErrorMessage
          error={errors.description}
          validate={['required', 'minLength', 'maxLength']}
        />
        <p className="text-right text-gray-400">0 / 200 words</p>
      </div>
    </FieldLayout>
  );
}
