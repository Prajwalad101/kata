import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'src/layouts/LocationProvider';
import { classNames } from 'src/utils/tailwind';

interface MapSearchProps {
  // coordinates:
  className?: string;
}

type MapMouseEvent = google.maps.MapMouseEvent;

export default function MapSearch({ className = '' }: MapSearchProps) {
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const userCoordinates = useLocation();
  const [origin, setOrigin] = useState<[number, number]>();

  // store original reference to user coordinates
  const center = useRef<{ lat: number; lng: number }>();

  const handleMapClick = (e: MapMouseEvent) => {
    if (e.latLng) {
      setOrigin([e.latLng.lng(), e.latLng.lat()]);
    }
  };

  useEffect(() => {
    if (userCoordinates) {
      center.current = { lng: userCoordinates[0], lat: userCoordinates[1] };
      // setOrigin(userCoordinates);
    }
  }, [userCoordinates]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey as string,
  });

  if (!googleApiKey) {
    console.error('Google Maps Api key not found');
    return <></>;
  }

  if (!isLoaded) return <div>Loading ...</div>;

  return (
    <div className={classNames(className)}>
      <GoogleMap
        onClick={handleMapClick}
        zoom={12}
        center={center.current}
        mapContainerClassName="w-full h-[450px] rounded-lg"
      >
        {origin && <MarkerF position={{ lng: origin[0], lat: origin[1] }} />}
      </GoogleMap>
    </div>
  );
}
