import { IUser } from '@destiny/common/types';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

interface UserProfileProps {
  user: Partial<IUser>;
  logout: () => void;
}

export default function UserProfile({ user, logout }: UserProfileProps) {
  const router = useRouter();

  const navigateToProfile = () => {
    router.push(`/user/${user._id}`);
  };

  return (
    <div className="h-[40px]">
      <Menu as="div" className="relative inline-block h-[40px] text-left">
        <Menu.Button className="h-[40px]">
          {user?.picture && (
            <Image
              width={40}
              height={40}
              className="cursor-pointer rounded-full"
              alt="user-profile"
              src={user.picture}
            />
          )}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1">
              <Menu.Item>
                <button className="group flex w-full cursor-default items-center bg-gray-100 px-2 py-3 text-sm text-gray-900">
                  Prajwal Adhikari
                </button>
              </Menu.Item>
              {user.email && (
                <Menu.Item>
                  <button className="group w-full cursor-default overflow-hidden overflow-ellipsis whitespace-nowrap bg-gray-100 px-2 py-2 text-start text-sm text-gray-900">
                    {user.email}
                  </button>
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={navigateToProfile}
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${
                      active ? 'bg-red-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Log out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
