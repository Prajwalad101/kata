import SidebarCategoryDropdown from '@features/home-page/components/SidebarCategoryDropdown/SidebarCategoryDropdown';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdPerson } from 'react-icons/io';
import { MdLogin } from 'react-icons/md';
import { useSidebar } from 'src/components/context-provider';
import Logo from 'src/components/logo/Logo';
import Portal from 'src/components/Portal/Portal';
import { categoryDropdownData } from 'src/data';
import { classNames } from 'src/utils/tailwind';

export default function Sidebar() {
  const { open, setOpen } = useSidebar();

  return (
    <Portal selector="#__next">
      <div
        className={classNames(
          !open ? '-translate-x-[300px]' : '',
          'absolute top-0 z-20 h-[100vh] w-[300px] overflow-scroll bg-gray-50 p-5 font-rubik transition-all duration-500 md:hidden'
        )}
      >
        {/* Logo section */}
        <div className="mb-5 flex items-center justify-between">
          <Logo />
          <AiOutlineClose
            size={25}
            className="cursor-pointer hover:text-gray-700"
            onClick={() => setOpen(!open)}
          />
        </div>
        {/* Signup section */}
        <div className="mb-7 text-gray-700">
          <div className="mb-1 flex cursor-pointer items-center gap-2 rounded-md py-2 transition-all duration-300 hover:bg-gray-200 hover:pl-2">
            <IoMdPerson size={23} />
            <p>Sign up</p>
          </div>
          <div className="flex cursor-pointer items-center gap-2 rounded-md py-2 transition-all duration-300 hover:bg-gray-200 hover:px-2">
            <MdLogin size={25} />
            <p>Log in</p>
          </div>
        </div>
        <div className="mb-5">
          <Link href="/write-review">
            <a
              className="mb-3 block w-max cursor-pointer underline underline-offset-2 hover:text-gray-600"
              onClick={() => setOpen(!open)}
            >
              Write a Review
            </a>
          </Link>
          <Link href="/register-business">
            <a
              className="block w-max cursor-pointer underline underline-offset-2 hover:text-gray-600"
              onClick={() => setOpen(!open)}
            >
              For Businesses
            </a>
          </Link>
        </div>
        {/* Divider */}
        <div className="h-[1px] bg-gray-500" />

        {/* Dropdown section */}
        <p className="mb-3 mt-4 text-lg font-medium">Explore</p>
        <div className="mt-5 font-rubik md:hidden">
          {categoryDropdownData.map((category, index) => (
            <div key={index}>
              <SidebarCategoryDropdown
                category={category}
                onClick={() => setOpen(!open)}
              />
            </div>
          ))}
        </div>
      </div>
    </Portal>
  );
}
