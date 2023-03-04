import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { MyModal } from 'src/components';

type DirectionsResult = google.maps.DirectionsResult;
type TravelMode = google.maps.TravelMode;

const options = [
  { label: 'Driving', value: 'DRIVING' },
  { label: 'Walking', value: 'WALKING' },
  { label: 'Bicycling', value: 'BICYCLING' },
] as const;

interface BusinessDirectionsProps {
  isOpen: boolean;
  closeModal: () => void;
  businessCoordinates: [number, number];
}

export default function BusinessDirections({
  isOpen,
  closeModal,
  businessCoordinates,
}: BusinessDirectionsProps) {
  const [directions, setDirections] = useState<DirectionsResult>();
  const [travelMode, setTravelMode] = useState<TravelMode>(
    google.maps.TravelMode.DRIVING
  );
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const center = useMemo(
    () => ({ lng: businessCoordinates[0], lat: businessCoordinates[1] }),
    [businessCoordinates]
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey as string,
  });

  useEffect(() => {
    if (!travelMode) return;

    const directionsService = new google.maps.DirectionsService();

    const origin = new google.maps.LatLng(27.701251, 85.316449);

    /* const destination = new google.maps.LatLng(
      businessCoordinates[1],
      businessCoordinates[0]
    ); */
    const destination = new google.maps.LatLng(27.687571, 85.295493);

    directionsService.route(
      {
        origin,
        destination,
        travelMode,
      },
      (result, status) => {
        console.log(status);

        if (status === 'OK' && result) {
          setDirections(result);
        }
      }
    );
  }, [businessCoordinates, travelMode]);

  if (!googleApiKey) {
    console.error('Google Maps Api key not found');
    return <></>;
  }

  if (!isLoaded) return <div>Loading ...</div>;

  return (
    <MyModal closeModal={closeModal} isOpen={isOpen}>
      <div className="w-[900px] rounded-md bg-white p-4">
        <h3 className="mb-4 text-center text-xl font-medium">Directions</h3>
        <div className="mb-5 flex justify-between">
          <Select
            defaultValue={options.find((option) => option.value === travelMode)}
            className="w-60"
            options={options}
            onChange={(selected) => {
              const travelMode = selected?.value as TravelMode | undefined;
              if (travelMode) {
                setTravelMode(travelMode);
              }
            }}
          />
          {directions && <Distance leg={directions.routes[0].legs[0]} />}
        </div>
        <div>
          <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="w-full h-[500px] mb-5"
          >
            {directions && <DirectionsRenderer directions={directions} />}
            <MarkerF position={center} />
          </GoogleMap>
        </div>
      </div>
    </MyModal>
  );
}

interface DistanceProps {
  leg: google.maps.DirectionsLeg;
}

function Distance({ leg }: DistanceProps) {
  if (!leg.distance || !leg.duration) return <></>;

  return (
    <div>
      <p className="font-medium text-gray-800">Distance: {leg.distance.text}</p>
      <p className="font-medium text-gray-800">Duration: {leg.duration.text}</p>
    </div>
  );
}
