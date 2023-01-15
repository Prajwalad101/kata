import { FieldLayout } from '@features/register-business/layouts';
import { FormInputs } from '@features/register-business/layouts/FormContainer';
import {
  Control,
  useFieldArray,
  UseFormRegister,
  useFormState,
} from 'react-hook-form';
import { FiTrash2 } from 'react-icons/fi';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MyInput from '../MyInput/MyInput';
import MyLabel from '../MyLabel/MyLabel';

interface DirectionsInputProps {
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
}

export default function DirectionsInput({
  register,
  control,
}: DirectionsInputProps) {
  const { errors } = useFormState({ control, name: 'directions' });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'directions',
    rules: {
      maxLength: { value: 3, message: 'Cannot add more than 3 directions' },
    },
  });

  return (
    <FieldLayout>
      <MyLabel
        name="directions"
        sublabel="Provide one or more directions to your customers"
      />
      <div>
        {fields.map((field, index) => (
          <div className="mb-2" key={field.id}>
            <div className="flex items-center gap-4">
              <MyInput
                className="mb-2"
                {...register(`directions.${index}.value`, {
                  required: 'This field cannot be empty',
                  minLength: { value: 10, message: 'Direction is too short' },
                  maxLength: { value: 50, message: 'Direction is too long' },
                })}
                error={errors.directions && errors.directions[index]?.value}
              />
              {index !== 0 && (
                <div
                  onClick={() => remove(index)}
                  className="cursor-pointer rounded-full p-2 text-red-500 transition-all
                hover:bg-gray-100 hover:text-red-400"
                >
                  <FiTrash2 size={23} />
                </div>
              )}
            </div>
            <ErrorMessage
              error={errors.directions && errors.directions[index]?.value}
              validate={['minLength', 'maxLength', 'required']}
            />
          </div>
        ))}
        <ErrorMessage
          error={errors.directions?.root}
          validate={['maxLength']}
          className="mb-2"
        />
        <button
          type="button"
          className="text-blue-700 hover:text-blue-500"
          onClick={() => append({ value: '' })}
        >
          Add direction
        </button>
      </div>
    </FieldLayout>
  );
}
