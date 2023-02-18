import notFoundAnim from 'public/animations/no-data.json';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Lottie from 'react-lottie';

interface CommunitySectionNotFoundProps {
  message?: string;
}

export default function CommunitySectionNotFound({message}:CommunitySectionNotFoundProps) {
  const { ref, inView } = useInView();
  const [isStopped, setIsStopped] = useState(true);

  const animOptions = {
    loop: false,
    autoplay: true,
    animationData: notFoundAnim,
    rendererSetting: { preserveAspectRatio: 'xMidYMid slice' },
  };

  useEffect(() => {
    if (inView) {
      setIsStopped(false);
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <Lottie options={animOptions} isStopped={isStopped} height={300} />
      <p className="text-center text-xl font-medium text-gray-600">
        {message ? 
          message
          :
          'Sorry. We could not find what you are looking for'
        }
      </p>
    </div>
  );
}
