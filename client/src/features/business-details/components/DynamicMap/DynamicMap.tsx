import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';

interface DynamicMapProps {
  coordinates: [number, number];
  className?: string;
}

export default function DynamicMap({
  coordinates,
  className = '',
}: DynamicMapProps) {
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const center = useMemo(
    () => ({ lng: coordinates[0], lat: coordinates[1] }),
    [coordinates]
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey as string,
  });

  if (!googleApiKey) {
    console.error('Google Maps Api key not found');
    return <></>;
  }

  if (!isLoaded) return <div>Loading ...</div>;

  return (
    <div className={className}>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="w-full h-[350px]"
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
}
