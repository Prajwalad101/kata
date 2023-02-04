import FormStep3 from '@features/register-business/components/FormStep3/FormStep3';
import FormStep4 from '@features/register-business/components/FormStep4/FormStep4';
import { useSubmitForm } from '@features/register-business/hooks';
import { dataToFormData } from '@features/register-business/utils/objects/dataToFormData';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Divider, PrimaryButton, SecondaryButton } from 'src/components';
import { Breadcrumbs, FormStep1, FormStep2, Header } from '../../components';
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

function FormContainer() {
  const [step, setStep] = useState(4);

  const resolver = yupResolver(validationSchemas[step - 1]);
  const { register, control, handleSubmit, setValue } = useForm({
    defaultValues: defaultFormValues,
    resolver,
  });

  const submitFormMutation = useSubmitForm();

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
      const formData = dataToFormData(data);
      submitFormMutation.mutate(formData);
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
          <PrimaryButton type="submit" className="px-10 py-2">
            Next
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}

export default FormContainer;
