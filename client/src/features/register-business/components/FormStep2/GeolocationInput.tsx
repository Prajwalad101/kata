import { FieldLayout } from '@features/register-business/layouts';
import { FormInputs } from '@features/register-business/layouts/FormContainer';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useEffect, useRef } from 'react';
import {
  Control,
  Controller,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import { useLocation } from 'src/layouts/LocationProvider';
import MyLabel from '../MyLabel/MyLabel';

type MapMouseEvent = google.maps.MapMouseEvent;

interface GeoLocationInputProps {
  setValue: UseFormSetValue<FormInputs>;
  control: Control<FormInputs>;
}

export default function GeoLocationInput({
  control,
  setValue,
}: GeoLocationInputProps) {
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const userCoordinates = useLocation();

  const origin = useWatch({ control, name: 'coordinates' });

  // store original reference to user coordinates
  const center = useRef<{ lat: number; lng: number }>();

  useEffect(() => {
    // coordinates for kathmandu
    const defaultCoordinates: [number, number] = [85.322248, 27.709694];

    /* if user denies access to their current location,
    use default location as origin */
    let coordinates;
    if (!userCoordinates) {
      coordinates = defaultCoordinates;
    } else {
      coordinates = userCoordinates;
    }
    center.current = { lng: coordinates[0], lat: coordinates[1] };
    setValue('coordinates', coordinates);
  }, [userCoordinates, setValue]);

  const handleMapClick = (
    e: MapMouseEvent,
    onChange: (..._e: unknown[]) => void
  ) => {
    if (e.latLng) {
      onChange([e.latLng.lng(), e.latLng.lat()]);
    }
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey as string,
  });

  if (!googleApiKey) {
    console.error('Google Maps Api key not found');
    return <></>;
  }

  if (!isLoaded) return <div>Loading ...</div>;

  return (
    <FieldLayout>
      <MyLabel
        name="location"
        sublabel="Provide the location of your business"
      />
      <Controller
        control={control}
        name="coordinates"
        render={({ field }) => (
          <GoogleMap
            zoom={10}
            center={center.current}
            mapContainerClassName="w-full h-[350px]"
            onClick={(e: MapMouseEvent) => handleMapClick(e, field.onChange)}
          >
            {origin && (
              <MarkerF position={{ lat: origin[1], lng: origin[0] }} />
            )}
          </GoogleMap>
        )}
      />
    </FieldLayout>
  );
}
