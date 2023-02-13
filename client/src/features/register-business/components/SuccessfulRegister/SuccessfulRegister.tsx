import { useRouter } from 'next/router';
import confettiAnimation from 'public/animations/confetti.json';
import rocketLaunchAnimation from 'public/animations/rocket-launch.json';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { PrimaryButton } from 'src/components';

export default function SuccessfulRegister() {
  const router = useRouter();

  const [animationStep, setAnimationStep] = useState(0);
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  const confettiAnimOptions = {
    loop: false,
    autoplay: true,
    animationData: confettiAnimation,
    rendererSetting: { preserveAspectRatio: 'xMidYMid slice' },
  };

  const rocketAnimOptions = {
    loop: false,
    autoplay: true,
    animationData: rocketLaunchAnimation,
    rendererSetting: { preserveAspectRatio: 'xMidYMid slice' },
  };

  const eventListeners = [
    {
      eventName: 'complete',
      callback: () => setAnimationStep(1),
    },
    {
      eventName: 'loopComplete',
      callback: () => {
        console.log('loop complete');
      },
    },
  ] as const;

  if (!shouldRender) return <></>;

  return (
    <div className="">
      {animationStep === 0 && (
        <Lottie
          options={confettiAnimOptions}
          height={500}
          eventListeners={eventListeners}
        />
      )}
      {animationStep === 1 && (
        <Lottie
          options={rocketAnimOptions}
          height={500}
          eventListeners={eventListeners}
        />
      )}
      <div>
        <p className="mt-10 mb-5 text-center font-merriweather text-3xl font-semibold text-gray-900">
          Congratulations. Your business registration has been submitted.
        </p>
        <p className="mb-10 text-center text-xl leading-loose text-gray-700">
          However, it may take about 3-4 days for our team to verify the details
          you have provided.
        </p>
        <div className="flex justify-center">
          <PrimaryButton onClick={() => router.push('/')} className="py-3 px-8">
            Go back to homepage
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
