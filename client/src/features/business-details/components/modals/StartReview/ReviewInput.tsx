import { IReviewFormValues } from '@features/business-details/types';
import {
  Control,
  UseFormRegister,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { classNames } from 'src/utils/tailwind';
import InputError from './InputError';

type ReviewInputProps = {
  register: UseFormRegister<IReviewFormValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<IReviewFormValues, any>;
};

export default function ReviewInput({ register, control }: ReviewInputProps) {
  const { errors } = useFormState({ control });
  const review = useWatch({ control, name: 'review' });

  return (
    <div className={errors.review ? 'mb-5' : ''}>
      <p className="mb-3 text-lg font-medium">Review</p>
      <textarea
        {...register('review', {
          required: true,
          minLength: 10,
          maxLength: 1000,
        })}
        id="review"
        placeholder="Write about your experience"
        rows={7}
        className={classNames(
          'mb-4 h-[120px] w-full rounded-md bg-gray-200 p-4  ring-offset-2 focus:outline-none focus:ring sm:h-auto',
          errors.review ? 'ring-red-500' : 'ring-blue-500'
        )}
      />
      <div className="flex justify-between">
        <Error errorType={errors.review?.type} />
        <p className="grow text-right text-sm text-gray-600">
          {review.length} / 1000
        </p>
      </div>
    </div>
  );
}

function Error({ errorType }: { errorType: string | undefined }) {
  return (
    <>
      {errorType === 'required' && (
        <InputError>This field is required</InputError>
      )}
      {errorType === 'maxLength' && (
        <InputError>Your review is too long</InputError>
      )}
      {errorType === 'minLength' && (
        <InputError>Your review is too short</InputError>
      )}
    </>
  );
}
