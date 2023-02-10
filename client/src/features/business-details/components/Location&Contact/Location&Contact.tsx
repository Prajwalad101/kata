import { AiOutlineMail } from 'react-icons/ai';
import { BiPhone } from 'react-icons/bi';
import { BsLaptop } from 'react-icons/bs';
import { TbBuildingCommunity } from 'react-icons/tb';
import { classNames } from 'src/utils/tailwind';

interface LocationAndContactProps {
  className?: string;
}

export default function LocationAndContact({
  className = '',
}: LocationAndContactProps) {
  return (
    <div
      className={classNames(
        className,
        'rounded-md border-2 border-gray-200 px-5 py-6'
      )}
    >
      <h4 className="mb-6 text-xl font-medium">
        Location and Contact Information
      </h4>
      <div className="mb-5 h-[200px] w-full bg-gray-200" />
      <div className="mb-10 flex items-start gap-4 ">
        <TbBuildingCommunity size={23} className="shrink-0" />
        <span>2.5 miles from Bouddha stupa</span>
      </div>

      <div className="mb-3 flex gap-4">
        <BiPhone size={23} className="shrink-0" />
        <span>+977 980-3939558</span>
      </div>
      <div className="mb-3 flex gap-4">
        <AiOutlineMail size={23} className="shrink-0" />
        <span className="break-all">business.laughingbird@gmail.com</span>
      </div>
      <div className="flex cursor-pointer gap-4 hover:text-gray-600">
        <BsLaptop size={23} className="shrink-0" />
        <span className="underline">Website</span>
      </div>
    </div>
  );
}
