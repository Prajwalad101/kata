import { FieldLayout } from '@features/register-business/layouts';
import { FormInputs } from '@features/register-business/layouts/FormContainer';
import {
  Control,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  useFormState,
} from 'react-hook-form';
import { FiTrash2 } from 'react-icons/fi';
import { classNames } from 'src/utils/tailwind';
import MyInput from '../MyInput/MyInput';
import MyLabel from '../MyLabel/MyLabel';
import UploadBusinessImage from './UploadBusinessImage';

interface FormStep3Props {
  control: Control<FormInputs>;
  register: UseFormRegister<FormInputs>;
  setValue: UseFormSetValue<FormInputs>;
  className?: string;
}

export default function FormStep4({
  control,
  register,
  setValue,
  className = '',
}: FormStep3Props) {
  const { errors } = useFormState({ control, name: 'email' });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socials',
    rules: {
      maxLength: { value: 3, message: 'Cannot add more than 3 socials' },
    },
  });

  return (
    <div className={classNames(className)}>
      <FieldLayout>
        <MyLabel name="email" sublabel="Please provide your business email" />
        <MyInput
          placeholder="business@email.com"
          {...register('email')}
          className="mb-2"
        />
      </FieldLayout>
      <FieldLayout>
        <MyLabel
          name="socials"
          sublabel="Provide one or more socials (Facebook, Instagram)"
        />
        <div>
          {fields.map((field, index) => (
            <div className="mb-2" key={field.id}>
              <div className="flex items-center gap-4">
                <MyInput
                  className="mb-2"
                  {...register(`socials.${index}.value`, {
                    required: 'This field cannot be empty',
                  })}
                  error={errors.socials && errors.socials[index]?.value}
                  placeholder="instagram.com/business"
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
            </div>
          ))}
          <button
            type="button"
            className="text-blue-700 hover:text-blue-500"
            onClick={() => append({ value: '' })}
          >
            Add social
          </button>
        </div>
      </FieldLayout>
      <UploadBusinessImage
        control={control}
        setValue={setValue}
        register={register}
      />
    </div>
  );
}
