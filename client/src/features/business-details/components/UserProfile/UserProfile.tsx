import Image from 'next/image';
import { classNames } from 'src/utils/tailwind';

interface UserProfileProps {
  profile: {
    name: string;
    image: string;
    time: string;
  };
  className?: string;
}

export default function UserProfile({
  profile,
  className = '',
}: UserProfileProps) {
  return (
    <div className={classNames('flex items-center gap-5', className)}>
      <div className="flex flex-col">
        <div className="h-[45px] shrink-0">
          <Image
            className="rounded-full"
            src={profile.image}
            alt="user-profile"
            width={50}
            height={50}
            objectFit="cover"
          />
        </div>
        <div className="border-l-2 border-gray-200" />
      </div>
      <div>
        <p className="mb-[2px] font-medium capitalize">{profile.name}</p>
        <div className="flex items-center gap-4">
          <p className="text-gray-600">8 reviews</p>
          <div className="h-[5px] w-[5px] shrink-0 rounded-full bg-gray-600" />
          <p className="text-gray-600">3 d</p>
        </div>
      </div>
    </div>
  );
}
