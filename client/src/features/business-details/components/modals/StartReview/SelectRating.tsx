import { IReviewFormValues } from '@features/business-details/types';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useFormState,
} from 'react-hook-form';
import { BsStar, BsStarFill } from 'react-icons/bs';
import InputError from './InputError';

interface SelectRatingProps {
  register: UseFormRegister<IReviewFormValues>;
  setValue: UseFormSetValue<IReviewFormValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<IReviewFormValues, any>;
  getValues: UseFormGetValues<IReviewFormValues>;
}

export default function SelectRating({
  setValue,
  getValues,
  register,
  control,
}: SelectRatingProps) {
  const { errors } = useFormState({ control });

  return (
    <div className="mb-10">
      <div>
        <input
          type="number"
          hidden
          readOnly
          {...register('rating', { min: 1, max: 5 })}
        />
      </div>
      <p className="mb-3 text-lg font-medium">Rating</p>
      <StarIcons
        rating={getValues('rating')}
        onClick={(iconNum) =>
          setValue('rating', iconNum, { shouldValidate: true })
        }
      />
      {errors.rating?.type === 'min' && (
        <InputError>Please provide a rating</InputError>
      )}
    </div>
  );
}

interface StarIconsProps {
  onClick: (_value: number) => void;
  rating: number;
}

function StarIcons({ onClick, rating }: StarIconsProps) {
  const iconNums = [5, 4, 3, 2, 1];

  let ratingStatus = '';
  switch (rating) {
    case 1:
      ratingStatus = 'Very Poor';
      break;
    case 2:
      ratingStatus = 'Poor';
      break;
    case 3:
      ratingStatus = 'Average';
      break;
    case 4:
      ratingStatus = 'Very Good';
      break;
    case 5:
      ratingStatus = 'Excellent';
      break;
  }

  return (
    <div className="ratings mb-4 flex flex-row-reverse flex-wrap justify-end gap-y-2 text-gray-700">
      {ratingStatus && (
        <span className="ml-3 inline-block text-gray-500">
          ({ratingStatus})
        </span>
      )}

      {iconNums.map((iconNum) => {
        return (
          <div
            key={iconNum}
            onClick={() => onClick(iconNum)}
            className="group cursor-pointer px-1"
          >
            <BsStar
              size={22}
              className="star-empty group-hover:hidden"
              style={rating >= iconNum ? { display: 'none' } : {}}
            />
            <BsStarFill
              size={22}
              className="star-full text-primaryred group-hover:block"
              style={rating >= iconNum ? { display: 'block' } : {}}
            />
          </div>
        );
      })}
    </div>
  );
}
