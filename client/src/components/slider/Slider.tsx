import React, { useEffect, useRef, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useWindowSize } from 'src/hooks';
import { ButtonProps } from 'src/types/props';
import { getVisibleChildrenCount } from 'src/utils/dom';
import { classNames } from 'src/utils/tailwind';

interface SliderProps {
  children: React.ReactNode;
  numItems: number;
  className?: string;
  LeftButton?: (_props: ButtonProps) => JSX.Element;
  RightButton?: (_props: ButtonProps) => JSX.Element;
}

function Slider({
  children,
  numItems,
  className = '',
  LeftButton,
  RightButton,
}: SliderProps) {
  // slider index increases or decreases on each button click
  const [sliderIndex, setSliderIndex] = useState<number>(1);
  const [numVisibleChildren, setNumVisibleChildren] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // run useEffect logic on window resize
  const { width } = useWindowSize();

  // get the number of currently visible items on the slider
  useEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) return;

    // the number of visible children inside the scroll container
    const numVisibleChildren = getVisibleChildrenCount({
      containerElement,
    });

    if (numVisibleChildren) {
      setNumVisibleChildren(numVisibleChildren);
    }
  }, [sliderIndex, width]);

  const handleLeft = () => {
    setSliderIndex((prevIndex) => --prevIndex);
  };

  const handleRight = () => {
    setSliderIndex((prevIndex) => ++prevIndex);
  };

  const leftButton = LeftButton ? (
    <LeftButton onClick={handleLeft} disabled={sliderIndex <= 1} />
  ) : (
    <SliderLeftButton onClick={handleLeft} disabled={sliderIndex <= 1} />
  );
  const rightButton = RightButton ? (
    <RightButton
      onClick={handleRight}
      disabled={sliderIndex * numVisibleChildren >= numItems}
    />
  ) : (
    <SilderRightButton
      onClick={handleRight}
      disabled={sliderIndex * numVisibleChildren >= numItems}
    />
  );

  return (
    <div className={classNames(className, 'relative overflow-hidden')}>
      {/* Slider */}
      <div
        ref={containerRef}
        // translate container based on slider index
        style={{
          transform: `translate(${(sliderIndex - 1) * -100}%)`,
          transition: 'transform 400ms ease-in-out',
        }}
        className="flex h-full scroll-smooth child:shrink-0"
      >
        {children}
      </div>
      {/* Slider Control Buttons */}
      {leftButton}
      {rightButton}
    </div>
  );
}

export default Slider;

const SliderLeftButton = ({ onClick, disabled }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        'absolute left-[5px] top-[50%] z-10 translate-y-[-50%]  rounded-full bg-gray-50 p-1 shadow-md transition-colors',
        disabled ? 'opacity-50' : 'opacity-80 hover:opacity-100'
      )}
      disabled={disabled}
    >
      <BiChevronLeft size={30} />
    </button>
  );
};

const SilderRightButton = ({ onClick, disabled }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        'absolute top-[50%] right-[5px] z-10 translate-y-[-50%] rounded-full bg-gray-50 p-1 shadow-md transition-colors',
        disabled ? 'opacity-50' : 'opacity-80 hover:opacity-100'
      )}
      disabled={disabled}
    >
      <BiChevronRight size={30} />
    </button>
  );
};
