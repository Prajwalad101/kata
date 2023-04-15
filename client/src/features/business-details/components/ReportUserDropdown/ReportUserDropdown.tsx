import ErrorMessages from '@destiny/common/data/errorsMessages';
import useReportUser from '@features/business-details/queries/useReportUser';
import { Menu, Transition } from '@headlessui/react';
import { AxiosError } from 'axios';
import { ChangeEvent, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { MyModal, PrimaryButton, SecondaryButton } from 'src/components';
import { useAuth } from 'src/layouts/UserProvider';
import { classNames } from 'src/utils/tailwind';

interface ReportUserDropdownProps {
  userId: string;
}

const reportData = [
  { label: 'Adult content', value: 'adult-content' },
  { label: 'Offensive (rude, obscene)', value: 'offensive' },
  { label: 'Spam (ads, self-promotion)', value: 'spam' },
  { label: 'Trolling (Off topic)', value: 'troll' },
  { label: 'Copyright (plagarism, stealing)', value: 'copyright' },
  { label: 'Abusive messages', value: 'abuse' },
];

export default function ReportUserDropdown({
  userId, // user to report to
}: ReportUserDropdownProps) {
  const [openModal, setOpenModal] = useState(false);
  const [reports, setReports] = useState<string[]>([]);

  // currently logged in user
  const user = useAuth()?.user;

  const reportUserMutation = useReportUser();

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const report = e.target.id;

    setReports((prev) => {
      const prevClone = [...prev];

      if (prevClone.includes(report)) {
        const index = prevClone.indexOf(report);
        prevClone.splice(index, 1);
      } else {
        if (prevClone.length >= 2) {
          return prevClone;
        }
        prevClone.push(report);
      }
      return prevClone;
    });
  };

  const handleReport = () => {
    if (!user || !user._id) {
      return toast.error(ErrorMessages.loggedOut);
    }

    if (user.suspended) {
      return toast.error(ErrorMessages.suspended);
    }
    if (user.banned) {
      return toast.error(ErrorMessage.banned);
    }

    if (!reports || reports.length === 0) {
      return toast.error('You must select at least one category');
    }

    reportUserMutation.mutate(
      { violations: reports, reportedBy: user._id, userId: userId },
      {
        onSuccess: () => {
          setReports([]);
          toast.success('User successfully reported');
          setOpenModal(false);
        },
        onError: (err) => {
          setReports([]);
          if (err instanceof AxiosError) {
            toast.error(err.response?.data.message);
          } else {
            toast.error('Something went wrong. Please try again later');
          }
        },
      }
    );
  };

  // user cannot report themselves
  if (user?._id === userId) return <></>;

  return (
    <>
      <MyModal isOpen={openModal} closeModal={() => setOpenModal(false)}>
        <div className="w-[500px] rounded-lg bg-white py-7 px-6">
          <h3 className="mb-7 text-center text-xl font-medium">Report User</h3>
          <div className="mb-10">
            {reportData.map((item, index) => (
              <div key={index} className="mb-5">
                <input
                  type="checkbox"
                  className="inp-cbx"
                  id={item.value}
                  style={{ display: 'none' }}
                  onChange={handleSelect}
                  checked={reports.includes(item.value)}
                />
                <label className="cbx" htmlFor={item.value}>
                  <span>
                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                  </span>
                  <span className="capitalize">{item.label}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="flex gap-5">
            <PrimaryButton
              isLoading={reportUserMutation.isLoading}
              onClick={handleReport}
              className="grow py-3"
            >
              Report
            </PrimaryButton>
            <SecondaryButton
              onClick={() => setOpenModal(false)}
              className="grow py-3"
            >
              Cancel
            </SecondaryButton>
          </div>
        </div>
      </MyModal>
      {/* Dropdown menu to report user */}
      <Menu as="div" className="relative h-[29px]">
        <Menu.Button className="rounded-full px-1 py-[3px] transition-colors hover:bg-gray-200 xs:px-3">
          <BsThreeDotsVertical
            size={23}
            className="text-gray-700 xs:rotate-90"
          />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute right-0 mt-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setOpenModal(true)}
                  className={classNames(
                    active
                      ? 'border-gray-200 bg-gray-200'
                      : 'border-gray-300 bg-white',
                    'w-full whitespace-nowrap rounded-sm border px-5 py-[10px] text-right transition-colors sm:px-10'
                  )}
                >
                  Report User
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
