import useSendMail from '@features/business-details/queries/useSendMail';
import MyInput from '@features/register-business/components/MyInput/MyInput';
import { Dialog, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { PrimaryButton, SecondaryButton } from 'src/components';
import FormErrorMessage from 'src/components/FormErrorMessage/FormErrorMessage';
import { useAuth } from 'src/layouts/UserProvider';
import { classNames } from 'src/utils/tailwind';
import * as yup from 'yup';

interface FormInputs {
  subject: string;
  message: string;
}

const defaultValues: FormInputs = {
  subject: '',
  message: '',
};

const schema = yup.object({
  subject: yup
    .string()
    .required('This field is required')
    .min(5, 'Subject is too short')
    .max(20, 'Subject is too long'),
  message: yup
    .string()
    .required('This field is required')
    .min(20, 'Message is too short')
    .max(500, 'Message is too long'),
});

const resolver = yupResolver(schema);

interface SendMessageProps {
  isOpen: boolean;
  closeModal: () => void;
  businessEmail: string;
}

export default function SendMessage({
  isOpen,
  closeModal,
  businessEmail,
}: SendMessageProps) {
  const auth = useAuth();
  const user = auth?.user;

  const sendMailMutation = useSendMail();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues,
    resolver,
  });

  useEffect(() => {
    if (sendMailMutation.isSuccess) {
      reset(defaultValues);
    }
  }, [sendMailMutation.isSuccess]);

  const message = watch('message');
  const onSubmit = (data: FormInputs) => {
    sendMailMutation.mutate(
      { ...data, receiverEmail: businessEmail },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          closeModal();
        },
        onError: (err) => {
          if (err instanceof AxiosError) {
            toast.error(err.response?.data.message);
          }
        },
      }
    );
  };

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
              <Dialog.Panel className="w-full max-w-2xl">
                <div className="rounded-sm bg-white px-8 py-8">
                  <h3 className="mb-2 font-merriweather text-xl font-bold">
                    Send Message
                  </h3>
                  <p className="mb-10 text-gray-600">
                    This message is sent directly to the inbox of the business
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6 flex flex-wrap items-center gap-4">
                      {user?.picture && (
                        <div>
                          <Image
                            width={40}
                            height={40}
                            className="cursor-pointer rounded-full"
                            alt="user-profile"
                            src={user.picture}
                          />
                        </div>
                      )}
                      <p>{user?.userName}</p>
                    </div>

                    <div className="mb-5">
                      <label className="mb-2 block font-medium">Subject</label>
                      <MyInput
                        className="mb-3"
                        error={errors.subject}
                        {...register('subject')}
                        placeholder="Enter the subject"
                      />
                      <FormErrorMessage error={errors.subject} />
                    </div>

                    <label className="mb-2 block font-medium">Message</label>
                    <textarea
                      {...register('message')}
                      rows={6}
                      className={classNames(
                        errors.message ? 'ring-red-600' : 'ring-blue-600',
                        'mb-2 w-full rounded-md border-2 border-gray-300 p-5 outline-none ring-offset-2 transition-all focus:ring'
                      )}
                      placeholder="Enter your message"
                    />
                    <div className="mb-10 flex justify-between">
                      <div>
                        <FormErrorMessage error={errors.message} />
                      </div>
                      <p className="text-right text-gray-600">
                        {message.length} / 500
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-5">
                      <PrimaryButton
                        isLoading={sendMailMutation.isLoading}
                        type="submit"
                        className="px-10 py-2.5"
                      >
                        Send
                      </PrimaryButton>
                      <SecondaryButton
                        disabled={sendMailMutation.isLoading}
                        className="px-10 py-2.5"
                        onClick={closeModal}
                      >
                        Cancel
                      </SecondaryButton>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
