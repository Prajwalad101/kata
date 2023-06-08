import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { MyModal } from 'src/components';
import { useLocation } from 'src/layouts/LocationProvider';

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

  const coordinates = useLocation();

  const [directions, setDirections] = useState<DirectionsResult>();
  const [travelMode, setTravelMode] = useState<TravelMode>();
  const [origin, setOrigin] = useState<LatLng>();
  const [directionsError, setDirectionsError] = useState<string>();

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
    if (window.google) {
      if (coordinates) {
        const latLng = new google.maps.LatLng(coordinates[1], coordinates[0]);
        setOrigin(latLng);
      }
      const travelMode = google.maps.TravelMode.DRIVING;
      setTravelMode(travelMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates, window.google]);

  useEffect(() => {
    if (!travelMode || !origin) return;

    const directionsService = new google.maps.DirectionsService();

    const destination = new google.maps.LatLng(
      businessCoordinates[1],
      businessCoordinates[0]
    );

    directionsService.route(
      {
        origin,
        destination,
        travelMode,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirectionsError(undefined);
          setDirections(result);
        } else if (status === 'ZERO_RESULTS') {
          setDirectionsError(
            'No directions found. Please select other options'
          );
        }
      }
    );
  }, [businessCoordinates, travelMode, origin]);

  if (!googleApiKey) {
    console.error('Google Maps Api key not found');
    return <></>;
  }

  return (
    <MyModal closeModal={closeModal} isOpen={isOpen}>
      <div className="w-[900px] rounded-md bg-white p-4">
        <h3 className="mb-4 text-center text-xl font-medium text-gray-600">
          Directions
        </h3>
        <div className="flex items-center justify-between">
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
        <p className="mt-2 text-red-600">{directionsError}</p>
        {!isLoaded ? (
          <div className="my-4 h-[500px] w-full animate-pulse bg-gray-300"></div>
        ) : (
          <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="my-4 w-full h-[500px]"
            onClick={handleMapClick}
          >
            {directions && <DirectionsRenderer directions={directions} />}
            <MarkerF position={center} />
          </GoogleMap>
        )}
        <p className="mb-1 font-medium text-gray-600">Note: </p>
        <p className="text-gray-500">
          Click anywhere on the map to select your starting position
        </p>
        <p className="text-gray-500">
          Your starting position might not be accurate
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
      <p className="font-medium text-gray-700">Distance: {leg.distance.text}</p>
      <p className="font-medium text-gray-700">Duration: {leg.duration.text}</p>
    </div>
  );
}
