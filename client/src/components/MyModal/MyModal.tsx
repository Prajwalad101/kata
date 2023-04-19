import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { GrFormClose } from 'react-icons/gr';

interface MyModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
  className?: string;
}

export default function MyModal({
  children,
  isOpen,
  closeModal,
  className = '',
}: MyModalProps) {
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
          <div className="fixed inset-0 bg-black bg-opacity-50" />
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
              <div>
                <button
                  className="absolute -right-8 -top-8 rounded-full bg-white p-1 hover:bg-gray-100"
                  onClick={closeModal}
                >
                  <GrFormClose size={24} />
                </button>
                <Dialog.Panel className={className}>{children}</Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
