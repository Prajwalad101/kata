import sleepingPandaAnim from 'public/animations/sleeping-panda.json';
import Lottie from 'react-lottie';

export default function BusinessSearchEnd() {
  const pandaAnimOptions = {
    loop: true,
    autoplay: true,
    animationData: sleepingPandaAnim,
    rendererSetting: { preserveAspectRatio: 'xMidYMid slice' },
  };

  return (
    <div className="">
      <Lottie options={pandaAnimOptions} height={200} />
      <p className="text-center text-xl text-gray-700">
        You&apos;ve reached{' '}
        <span className="text-2xl font-medium text-black">THE END</span>.
        There&apos;s nothing more to show.
      </p>
    </div>
  );
}
