import { IReviewFormValues } from '@features/business-details/types';
import Image from 'next/image';
import File from 'public/illustrations/business-details/File.svg';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { readFilesAsDataURL } from 'src/utils/browser';
import { classNames } from 'src/utils/tailwind';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UploadImagesProps = {
  register: UseFormRegister<IReviewFormValues>;
  setValue: UseFormSetValue<IReviewFormValues>;
};

export default function UploadImages({
  register,
  setValue,
}: UploadImagesProps) {
  const [images, setImages] = useState<string[]>();
  const [error, setError] = useState<string>('');

  const onDrop = useCallback(
    (imageFiles: File[]) => {
      setValue('images', imageFiles);
      const { promises } = readFilesAsDataURL(imageFiles);

      Promise.all(promises)
        .then((images) => setImages(images))
        .catch((error) => setError(error));
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragReject, isDragAccept, open } =
    useDropzone({
      onDrop,
      noClick: true,
      maxFiles: 10,
      accept: {
        'image/*': ['.jpeg', '.png'],
      },
    });

  const acceptClassName = isDragAccept ? ' bg-gray-100 border-blue-400 ' : '';

  return (
    <div className="mb-10">
      <p className="mb-3 text-lg font-medium">Upload Photos</p>
      <div
        {...getRootProps()}
        className={classNames(
          'relative mb-4 flex w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 py-5 transition-colors',
          acceptClassName
        )}
      >
        <input {...register('images')} {...getInputProps()} />
        <div className="text-center">
          <div>
            <Image src={File} alt="file-illustration." width={45} height={45} />
          </div>
          <p className="mb-2 text-lg text-gray-700">Drag and Drop files here</p>
          <p className="mb-5 text-sm text-gray-400">
            Files supported: JPG, PNG, JPEG
          </p>
          <button
            type="button"
            onClick={open}
            className="rounded-md bg-gray-200 px-7 py-2.5 text-gray-700 transition-colors hover:bg-gray-300"
          >
            Browse
          </button>
          {!!images?.length && (
            <p className="mt-3 text-gray-500">
              {images.length && images.length} images uploaded
            </p>
          )}
        </div>
        {isDragReject && (
          <p className="text-gray-400">File type is not allowed</p>
        )}
      </div>
      <p className="text-gray-500">Note: Please upload less than 10 images</p>
      {error && <p className="mb-3 text-sm text-red-600">*{error}</p>}
      {/* Preview images */}
      <div className="flex gap-3 overflow-x-auto">
        {images?.map((image, index) => (
          <div key={index} className="relative h-[150px] w-[180px] shrink-0">
            <Image
              src={image}
              alt="image"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
