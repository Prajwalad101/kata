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
type MapMouseEvent = google.maps.MapMouseEvent;
type LatLng = google.maps.LatLng;

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
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [directions, setDirections] = useState<DirectionsResult>();
  const [travelMode, setTravelMode] = useState<TravelMode>(
    google.maps.TravelMode.DRIVING
  );
  const [origin, setOrigin] = useState<LatLng>(
    new google.maps.LatLng(27.701251, 85.316449)
  );

  const center = useMemo(
    () => ({ lng: businessCoordinates[0], lat: businessCoordinates[1] }),
    [businessCoordinates]
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey as string,
  });

  const handleMapClick = (e: MapMouseEvent) => {
    if (e.latLng) {
      setOrigin(e.latLng);
    }
  };

  useEffect(() => {
    if (!travelMode) return;

    const directionsService = new google.maps.DirectionsService();

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
        if (status === 'OK' && result) {
          setDirections(result);
        }
      }
    );
  }, [businessCoordinates, travelMode, origin]);

  if (!googleApiKey) {
    console.error('Google Maps Api key not found');
    return <></>;
  }

  if (!isLoaded) return <div>Loading ...</div>;

  return (
    <MyModal closeModal={closeModal} isOpen={isOpen}>
      <div className="w-[900px] rounded-md bg-white p-4">
        <h3 className="mb-4 text-center text-xl font-medium text-gray-600">
          Directions
        </h3>
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
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="mb-4 w-full h-[500px]"
          onClick={handleMapClick}
        >
          {directions && <DirectionsRenderer directions={directions} />}
          <MarkerF position={center} />
        </GoogleMap>
        <p className="mb-1 text-gray-500">
          <span className="font-medium text-gray-600">Note: </span>Click
          anywhere on the map to select your starting position
        </p>
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
