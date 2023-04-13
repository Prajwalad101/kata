import FormStep3 from '@features/register-business/components/FormStep3/FormStep3';
import FormStep4 from '@features/register-business/components/FormStep4/FormStep4';
import { SubmitFormResponse } from '@features/register-business/hooks/useSubmitForm';
import { dataToFormData } from '@features/register-business/utils/objects/dataToFormData';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Divider, PrimaryButton, SecondaryButton } from 'src/components';
import { Breadcrumbs, FormStep1, FormStep2, Header } from '../../components';
import ErrorMessage from '@destiny/common/data/errorsMessages';
import {
  registerBusinessFormStep1,
  registerBusinessFormStep2,
  registerBusinessFormStep3,
  registerBusinessFormStep4,
} from '../schemas/registerBusinessFormSchema';
import { defaultFormValues } from './data';

const validationSchemas = [
  registerBusinessFormStep1,
  registerBusinessFormStep2,
  registerBusinessFormStep3,
  registerBusinessFormStep4,
];

interface FormContainerProps {
  mutation: UseMutationResult<SubmitFormResponse, unknown, FormData, unknown>;
}

function FormContainer({ mutation }: FormContainerProps) {
  const [step, setStep] = useState(1);

  const resolver = yupResolver(validationSchemas[step - 1]);
  const { register, control, handleSubmit, setValue } = useForm({
    defaultValues: defaultFormValues,
    resolver,
  });

  // holds the highest validated form step
  const maxStepRef = useRef<number>(1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    if (step < 4) {
      setStep((prev) => {
        const newStep = prev + 1;
        maxStepRef.current = Math.max(newStep, maxStepRef.current);
        return newStep;
      });
    } else {
      data.directions = data.directions.map(
        (direction: { value: string }) => direction.value
      );
      data.socials = data.socials.map(
        (social: { value: string }) => social.value
      );
      data.location = {
        type: 'Point',
        coordinates: data.coordinates,
        address: data.address,
      };
      const formData = dataToFormData(data);
      mutation.mutate(formData, {
        onError: (error) => {
          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
              toast.error(ErrorMessage.loggedOut);
            } else {
              toast.error(ErrorMessage.generic);
            }
          }
        },
      });
    }
  };

  const handleBack = () => {
    if (step === 1) {
      // TODO: handle logic to cancel form
      return;
    }
    setStep((prev) => --prev);
  };

  return (
    <div className="xs:my-10 md:my-16">
      <Breadcrumbs
        onClick={(newStep) => {
          // only step through validated fields
          if (newStep <= maxStepRef.current) setStep(newStep);
        }}
        step={step}
      />
      <Header step={step} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <FormStep1
            control={control}
            register={register}
            className="mb-20 xs:pt-10"
          />
        )}
        {step === 2 && (
          <FormStep2
            setValue={setValue}
            control={control}
            register={register}
            className="mb-20 xs:pt-10"
          />
        )}
        {step === 3 && (
          <FormStep3 control={control} className="mb-20 xs:pt-10" />
        )}
        {step === 4 && (
          <FormStep4
            register={register}
            control={control}
            setValue={setValue}
            className="mb-20 xs:pt-10"
          />
        )}
        <Divider className="mb-10" width={2} />
        <div className="flex flex-wrap gap-x-10 gap-y-5">
          <SecondaryButton
            type="button"
            onClick={handleBack}
            className="py-2 px-10"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </SecondaryButton>
          <PrimaryButton
            isLoading={mutation.isLoading}
            type="submit"
            className="w-32 py-2.5"
          >
            {step === 4 ? 'Submit' : 'Next'}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}

export default FormContainer;
