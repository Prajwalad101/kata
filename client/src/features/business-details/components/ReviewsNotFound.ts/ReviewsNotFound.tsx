import notFoundAnim from 'public/animations/no-data.json';
import Lottie from 'react-lottie';

export default function ReviewsNotFound() {
  const notFoundAnimOptions = {
    loop: false,
    autoplay: true,
    animationData: notFoundAnim,
    rendererSetting: { preserveAspectRatio: 'xMidYMid slice' },
  };

  return (
    <div>
      <Lottie options={notFoundAnimOptions} height={300} />
      <p className="text-center text-xl font-medium text-gray-600">
        Sorry, we could not find what you&apos;re looking for
      </p>
    </div>
  );
}
