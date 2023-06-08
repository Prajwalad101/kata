import sleepingPandaAnim from 'public/animations/sleeping-panda.json';
import Lottie from 'react-lottie';

export default function BusinessNotFound() {
  const pandaAnimOptions = {
    loop: true,
    autoplay: true,
    animationData: sleepingPandaAnim,
    rendererSetting: { preserveAspectRatio: 'xMidYMid slice' },
  };

  return (
    <div>
      <Lottie options={pandaAnimOptions} height={500} />
      <p className="text-center text-3xl font-medium text-gray-700">
        Sorry. We cannot find what you&apos;re looking for.
      </p>
    </div>
  );
}
