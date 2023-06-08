import { toast } from 'react-toastify';

const getUserCoordinates = () => {
  const promise = new Promise<[number, number]>(function (resolve, reject) {
    const geolocation = navigator.geolocation;

    if (!geolocation) {
      reject(new Error('Cannot set location in your browser'));
    }

    geolocation.getCurrentPosition(
      (position) => {
        const { coords } = position;
        resolve([coords.longitude, coords.latitude]);
      },
      (error) => {
        if (error.PERMISSION_DENIED) {
          toast.error('Permission Denied');
        }
      },
      {
        enableHighAccuracy: false,
        maximumAge: Infinity,
      }
    );
  });

  return promise;
};

export default getUserCoordinates;
