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
      (_error) =>
        reject(
          new Error(
            'Something went wrong while getting your location. Please try again later'
          )
        )
    );
  });

  return promise;
};

export default getUserCoordinates;
