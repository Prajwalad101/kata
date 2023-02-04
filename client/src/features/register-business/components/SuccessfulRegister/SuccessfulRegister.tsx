import confettiAnimation from 'public/animations/confetti.json';
import rocketLaunchAnimation from 'public/animations/rocket-launch.json';
import { useState } from 'react';
import Lottie from 'react-lottie';

export default function SuccessfulRegister() {
  const [animationStep, setAnimationStep] = useState(0);

  const confettiAnimOptions = {
    loop: false,
    autoplay: true,
    animationData: confettiAnimation,
    rendererSetting: { preserveAspectRatio: 'xMidYMid slice' },
  };

  const rocketAnimOptions = {
    loop: true,
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

  return (
    <div>
      {animationStep === 0 && (
        <Lottie
          options={confettiAnimOptions}
          height={600}
          eventListeners={eventListeners}
        />
      )}
      {animationStep === 1 && (
        <Lottie
          options={rocketAnimOptions}
          height={600}
          eventListeners={eventListeners}
        />
      )}
      <div>
        <p className="my-10 text-center font-merriweather text-3xl font-semibold text-gray-900">
          Congratulations. Your business registration has been submitted.
        </p>
        <p className="text-center text-xl leading-loose text-gray-700">
          However, it may take about 3-4 days for our team to verify the details
          you have provided.
          <br /> We will let you know after that. Cheers :)
        </p>
      </div>
    </div>
  );
}
