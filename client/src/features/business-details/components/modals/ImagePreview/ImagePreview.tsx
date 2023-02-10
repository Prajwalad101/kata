import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { ButtonProps } from 'src/types/props';
import { classNames } from 'src/utils/tailwind';

interface ImagePreviewProps {
  businessName: string;
  isOpen: boolean;
  closeModal: () => void;
  images: string[];
}

export default function ImagePreview({
  businessName,
  isOpen,
  closeModal,
  images,
}: ImagePreviewProps) {
  // since order of images doesn't change, image index is used as image id
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'slideshow' | 'gallery'>(
    'slideshow'
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative h-[80vh] w-full max-w-7xl">
                <div className="h-full rounded-sm bg-white p-4">
                  {viewMode === 'slideshow' && (
                    <SlideShow
                      businessName={businessName}
                      images={images}
                      selectedIndex={selectedIndex}
                      setSelectedIndex={setSelectedIndex}
                      onClick={(_image) => setViewMode('gallery')}
                    />
                  )}
                  <div />
                  {viewMode === 'gallery' && (
                    <Gallery
                      images={images}
                      onClick={(imageIndex) => {
                        setViewMode('slideshow');
                        setSelectedIndex(imageIndex);
                      }}
                      selectedIndex={selectedIndex}
                    />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

interface SlideShowProps {
  businessName: string;
  images: string[];
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  onClick: (_image: string) => void;
}

function SlideShow({
  businessName,
  images,
  selectedIndex,
  setSelectedIndex,
  onClick,
}: SlideShowProps) {
  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleLeft = () => {
    setSelectedIndex((prevIndex) => --prevIndex);
  };

  const handleRight = () => {
    setSelectedIndex((prevIndex) => ++prevIndex);
  };

  const selectedImage =
    images.find((_, index) => index === selectedIndex) || images[0];

  return (
    <div className="flex h-full flex-col gap-5 md:flex-row">
      {/* Main Image */}
      <div className="relative h-full basis-[75%]">
        <div className="relative z-10 ml-6 mt-4">
          <h3 className="mb-1 font-merriweather text-lg font-bold text-white/90">
            {businessName}
          </h3>
          <p className="mb-3 text-white/70">{images.length} total images</p>
          <button
            onClick={() => onClick(selectedImage)}
            className="text-white/80 underline hover:text-white"
          >
            View in gallery
          </button>
        </div>
        <LeftButton onClick={handleLeft} disabled={selectedIndex <= 0} />
        <RightButton
          onClick={handleRight}
          disabled={selectedIndex >= images.length - 1}
        />
        <Image
          src={selectedImage}
          alt="business-image"
          layout="fill"
          objectFit="cover"
          className="rounded-sm"
        />
      </div>
      {/* Scrollable Images */}
      <div className="flex basis-[25%] grid-cols-1 gap-3 overflow-auto md:grid lg:grid-cols-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-full w-1/2 shrink-0 cursor-pointer xs:w-1/3 sm:w-1/5 md:h-[150px] md:w-full"
            onClick={() => handleImageClick(index)}
          >
            {index !== selectedIndex && (
              <div className="absolute inset-0 z-10 rounded-sm bg-black/20 hover:bg-black/10" />
            )}

            <Image
              key={index}
              src={image}
              alt="business-image"
              layout="fill"
              objectFit="cover"
              className="rounded-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface GalleryProps {
  images: string[];
  selectedIndex: number;
  onClick: (_index: number) => void;
}

function Gallery({ images, onClick, selectedIndex }: GalleryProps) {
  useEffect(() => {
    const element = document.getElementById(selectedIndex.toString());
    if (element) element.scrollIntoView();
  }, [selectedIndex]);

  return (
    <div className="grid h-full grid-flow-row auto-rows-[25%] grid-cols-2 gap-2 overflow-auto md:auto-rows-[33%] lg:grid-cols-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative h-full w-full"
          id={index.toString()}
        >
          <Image
            src={image}
            alt="business-image"
            layout="fill"
            objectFit="cover"
            className="cursor-pointer rounded-sm transition-opacity hover:opacity-80"
            onClick={() => onClick(index)}
          />
        </div>
      ))}
    </div>
  );
}

const LeftButton = ({ className = '', onClick, disabled }: ButtonProps) => {
  return (
    <button
      className={classNames(
        className,
        'absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1',
        disabled
          ? 'cursor-default opacity-40'
          : 'cursor-pointer opacity-80 hover:opacity-100'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <BiChevronLeft size={30} />
    </button>
  );
};

const RightButton = ({ onClick, className = '', disabled }: ButtonProps) => {
  return (
    <button
      className={classNames(
        className,
        'absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1',
        disabled
          ? 'cursor-default opacity-40'
          : 'cursor-pointer opacity-80 hover:opacity-100'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <BiChevronRight size={30} />
    </button>
  );
};
