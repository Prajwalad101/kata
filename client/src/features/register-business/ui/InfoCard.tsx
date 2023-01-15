import Image from 'next/image';
import { BsCheck2 } from 'react-icons/bs';
import { classNames } from 'src/utils/tailwind';

interface InfoCardProps {
  heading: React.ReactNode;
  items: string[];
  image: string;
  flip?: boolean;
  itemPadding?: number;
}

function InfoCard({ heading, image, items, flip }: InfoCardProps) {
  return (
    <div
      className={classNames(
        flip ? 'md:flex-row-reverse' : 'md:flex-row',
        'container mx-auto flex flex-col items-center gap-10 font-rubik md:items-start lg:w-[880px]'
      )}
    >
      <div className="w-[300px] shrink-0 sm:w-[330px] md:w-[360px]">
        <Image
          src={image}
          alt="img"
          width={360}
          height={290}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <div>
        {heading}
        <div className="child-notlast:mb-3">
          {items.map((item, index) => (
            <div className="flex gap-3" key={index}>
              <BsCheck2 size={20} className="mt-1 shrink-0 text-blue-800" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
