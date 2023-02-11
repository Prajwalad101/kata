import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { PrimaryButton, SecondaryButton } from 'src/components';

interface SendMessageProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function SendMessage({ isOpen, closeModal }: SendMessageProps) {
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
                  <div className="mb-6 flex flex-wrap items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500">
                      <p className="text-white">A</p>
                    </div>
                    <p>Abi Budhathoki</p>
                  </div>

                  <div className="mb-10">
                    <textarea
                      rows={6}
                      className="mb-2 w-full rounded-md bg-gray-200 p-5 outline-none ring-blue-500 ring-offset-2 focus:ring"
                      placeholder="Write your message to the business"
                    />
                    <p className="text-right text-gray-600">0 / 500</p>
                  </div>

                  <div className="flex flex-wrap gap-5">
                    <PrimaryButton className="px-10 py-2.5">Send</PrimaryButton>
                    <SecondaryButton
                      className="px-10 py-2.5"
                      onClick={closeModal}
                    >
                      Cancel
                    </SecondaryButton>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
