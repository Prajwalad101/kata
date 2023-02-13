import { FieldLayout } from '@features/register-business/layouts';
import { FormInputs } from '@features/register-business/layouts/FormContainer';
import { getUserCoordinates } from '@features/register-business/utils/api';
import { Control, Controller } from 'react-hook-form';
import { SecondaryButton } from 'src/components';
import FormErrorMessage from 'src/components/FormErrorMessage/FormErrorMessage';
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
        render={({ field, fieldState }) => (
          <div>
            <SecondaryButton
              type="button"
              onClick={() => handleClick(field.onChange)}
              className="py-3 px-6"
            >
              Set Location
            </SecondaryButton>
            <FormErrorMessage className="mt-2" error={fieldState.error} />
          </div>
        )}
      />
    </FieldLayout>
  );
}
