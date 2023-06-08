import Link from 'next/link';
import { AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { MyModal } from 'src/components';

interface LoginModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function LoginModal({ isOpen, closeModal }: LoginModalProps) {
  return (
    <MyModal
      className=" w-full max-w-md rounded-lg bg-white px-10 py-8"
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <div className="flex flex-col">
        <h3 className="mb-5 font-merriweather text-[1.7rem] font-semibold text-gray-800">
          Log in or sign up in seconds
        </h3>
        <p className="mb-6 leading-relaxed text-gray-600">
          Continue into the application by selecting any one of the socials
          below
        </p>

        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/start`}
        >
          <button
            onClick={closeModal}
            className="relative mb-2 flex w-96 items-center justify-center gap-5 rounded-md bg-gray-200 py-3 text-gray-900 transition-colors hover:bg-gray-300"
          >
            <FcGoogle size={27} className="absolute left-5" />
            Continue with Google
          </button>
        </Link>
        <p className="mb-2 text-center text-gray-500">or</p>
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/facebook/start`}
        >
          <button
            onClick={closeModal}
            className="relative mb-10 flex w-96 items-center justify-center gap-5 rounded-md bg-gray-200 py-3 text-gray-900 transition-colors hover:bg-gray-300"
          >
            <AiFillFacebook
              className="absolute left-5 text-blue-500 transition-colors group-hover:text-white"
              size={27}
            />
            Continue with Facebook
          </button>
        </Link>
        <p className="font-merriweather text-sm leading-relaxed text-gray-700">
          By continuing, you agree to Kata&apos;s <u>Terms of Use</u>. Read our{' '}
          <u>Privacy Policy</u>
        </p>
      </div>
    </MyModal>
  );
}
