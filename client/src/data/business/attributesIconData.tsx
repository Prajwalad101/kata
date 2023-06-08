import { BusinessFeature } from '@destiny/common/types';
import { FaChild } from 'react-icons/fa';
import { GiDeliveryDrone, GiPartyPopper, GiSmartphone } from 'react-icons/gi';
import { MdOutlineDining, MdOutlineLibraryMusic } from 'react-icons/md';

const defaultSize = 17;

const attributesIconData: {
  name: BusinessFeature;
  icon: (_size?: number) => JSX.Element;
}[] = [
  {
    name: 'delivery',
    icon: (size = defaultSize) => <GiDeliveryDrone size={size} />,
  },
  {
    name: 'reservations',
    icon: (size = defaultSize) => <GiSmartphone size={size} />,
  },
  {
    name: 'events',
    icon: (size = defaultSize) => <GiPartyPopper size={size} />,
  },
  {
    name: 'good for kids',
    icon: (size = defaultSize) => <FaChild size={size} />,
  },
  {
    name: 'live music',
    icon: (size = defaultSize) => <MdOutlineLibraryMusic size={size} />,
  },
  {
    name: 'outdoor dining',
    icon: (size = defaultSize) => <MdOutlineDining size={size} />,
  },
];

export default attributesIconData;
