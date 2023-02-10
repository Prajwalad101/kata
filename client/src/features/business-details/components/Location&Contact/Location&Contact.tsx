import { IBusiness } from '@destiny/common/types';
import { AiOutlineAim, AiOutlineMail } from 'react-icons/ai';
import { BiPhone } from 'react-icons/bi';
import { BsLaptop } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { classNames } from 'src/utils/tailwind';

interface LocationAndContactProps {
  location: IBusiness['location'];
  directions: IBusiness['directions'];
  email: IBusiness['email'];
  contactNumber: IBusiness['contactNumber'];
  className?: string;
}

export default function LocationAndContact({
  location,
  directions,
  email,
  contactNumber,
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
      <div className="flex flex-wrap items-start justify-between gap-x-5">
        <div
          className="mb-5 flex 
        items-center gap-5 font-medium text-gray-800"
        >
          <HiOutlineLocationMarker size={22} />
          <p className="">{location.address}</p>
        </div>
        <div className="mb-4">
          {directions.map((direction, index) => (
            <>
              <div key={index} className="mb-2 flex items-center gap-4 ">
                <AiOutlineAim size={20} className="shrink-0" />
                <span className="text-gray-800">{direction}</span>
              </div>
            </>
          ))}
        </div>
      </div>
      {/* Divider */}
      <div className="mb-4 border-b border-gray-200" />
      <div className="mb-3 flex gap-4">
        <BiPhone size={23} className="shrink-0" />
        <span>(+977) {contactNumber}</span>
      </div>
      <div className="mb-3 flex gap-4">
        <AiOutlineMail size={23} className="shrink-0" />
        <span className="break-all">{email}</span>
      </div>
      <div className="flex cursor-pointer gap-4 hover:text-gray-600">
        <BsLaptop size={23} className="shrink-0" />
        <span className="underline">Website</span>
      </div>
    </div>
  );
}
