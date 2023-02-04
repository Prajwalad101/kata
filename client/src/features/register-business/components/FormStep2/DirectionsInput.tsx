import { FieldLayout } from '@features/register-business/layouts';
import { FormInputs } from '@features/register-business/layouts/FormContainer';
import {
  Control,
  useFieldArray,
  UseFormRegister,
  useFormState,
} from 'react-hook-form';
import { FiTrash2 } from 'react-icons/fi';
import FormErrorMessage from 'src/components/FormErrorMessage/FormErrorMessage';
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
                {...register(`directions.${index}.value`)}
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
            <FormErrorMessage
              error={errors.directions && errors.directions[index]?.value}
            />
          </div>
        ))}
        <FormErrorMessage className="mt-2" error={errors.directions} />
        <button
          type="button"
          className="mt-2 text-blue-700 hover:text-blue-500"
          onClick={() => append({ value: '' })}
        >
          Add direction
        </button>
      </div>
    </FieldLayout>
  );
}
