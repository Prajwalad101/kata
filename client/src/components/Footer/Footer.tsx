import { BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
import Logo from '../logo/Logo';

export default function Footer() {
  return (
    <div className="ml-[calc(50%-50vw)] flex w-[100vw] flex-col items-center gap-5 bg-gray-100 px-3 py-8 text-black md:px-10">
      <div className="mb-2 flex gap-5">
        <button className="group rounded-md border-2 border-gray-500 p-2 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white">
          <FiTwitter
            size={20}
            className="text-gray-800 group-hover:text-white"
          />
        </button>
        <button className="group rounded-md border-2 border-gray-500 p-2 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white">
          <FaFacebookF
            size={20}
            className="text-gray-800 group-hover:text-white"
          />
        </button>
        <button className="group rounded-md border-2 border-gray-500 p-2 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white">
          <BsInstagram
            size={20}
            className="text-gray-800 group-hover:text-white"
          />
        </button>
      </div>
      <Logo />
      <div className="mt-3 mb-5 flex gap-3 font-medium text-gray-500">
        <p className="text-center text-sm uppercase">Faq</p>
        <p>|</p>
        <p className="text-center text-sm uppercase">About us</p>
        <p>|</p>
        <p className="text-center text-sm uppercase">Contact us</p>
      </div>
      <div className="w-full border border-gray-300 md:w-[50%]"></div>
      <div>
        {/* <p className="uppercase text-gray-500">
        Made with frustation for college submission
        </p> */}
        <p className="mb-4 text-center text-gray-700">
          Made with ❤ by Prajwal Adhikari{' '}
        </p>
        <p className="text-center text-gray-700">
          © 2022 Prajwal Adhikari | All Rights Reserved
        </p>
      </div>
    </div>
  );
}
