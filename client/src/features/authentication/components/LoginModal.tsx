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
      className="h-96 w-full max-w-xl rounded-lg bg-gray-200 px-5 pt-7"
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <div className="flex flex-col items-center justify-center">
        <h3 className="mb-5 text-center text-3xl font-medium text-gray-800">
          Sign in.
        </h3>
        <p className="mb-12 text-center leading-relaxed text-gray-500">
          Continue into the application by selecting any one of the <br />
          socials below
        </p>

        <Link
          href={`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/auth/google/start`}
        >
          <button
            onClick={closeModal}
            className="mb-2 flex w-96 items-center justify-center gap-5 rounded-md border-2 border-[#4285f4] py-3 text-black transition-colors hover:bg-[#4285f4] hover:text-white"
          >
            <FcGoogle size={27} />
            Continue with Google
          </button>
        </Link>
        <p className="mb-2 text-gray-500">or</p>
        <Link
          href={`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/auth/facebook/start`}
        >
          <button
            onClick={closeModal}
            className="group flex w-96 items-center justify-center gap-5 rounded-md border-2 border-[#4285f4] py-3 text-black transition-colors hover:bg-[#4285f4] hover:text-white"
          >
            <AiFillFacebook
              className="text-blue-500 transition-colors group-hover:text-white"
              size={27}
            />
            Continue with Facebook
          </button>
        </Link>
      </div>
    </MyModal>
  );
}
