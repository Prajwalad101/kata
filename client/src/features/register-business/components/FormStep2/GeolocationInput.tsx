import { FieldLayout } from '@features/register-business/layouts';
import { FormInputs } from '@features/register-business/layouts/FormContainer';
import { getUserCoordinates } from '@features/register-business/utils/api';
import { Control, Controller } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MyLabel from '../MyLabel/MyLabel';

interface GeoLocationInputProps {
  control: Control<FormInputs>;
}

export default function GeoLocationInput({ control }: GeoLocationInputProps) {
  const handleClick = (onChange: (..._e: unknown[]) => void) => {
    getUserCoordinates()
      .then((data) => onChange(data))
      .catch((err) => console.log(err));
  };

  return (
    <FieldLayout>
      <MyLabel name="location" sublabel="Allow access to your location" />
      <Controller
        control={control}
        name="coordinates"
        rules={{ required: 'Location is a required field' }}
        render={({ field, fieldState }) => (
          <div>
            <button
              className="mt-4 flex items-center gap-2 rounded-md bg-blue-500 px-6 py-3 text-white transition-all hover:bg-blue-400 hover:shadow-md"
              type="button"
              onClick={() => handleClick(field.onChange)}
            >
              Set Location
            </button>
            <ErrorMessage error={fieldState.error} validate={['required']} />
          </div>
        )}
      />
    </FieldLayout>
  );
}
