import { cities, days, TimeString } from '../../components/FormStep1/data';

export type FormInputs = {
  name: string;
  description: string;
  address: string;
  city: typeof cities[number] | '';
  workingDays: {
    day: typeof days[number];
    startTime: TimeString;
    endTime: TimeString;
  }[];
  contactNumber: string;
  email: string;
  coordinates: [number, number] | null;
  directions: { value: string }[];
  category: string;
  subcategory: string;
  features: string[];
  socials: { value: string }[];
  images: File[] | null;
};

export const defaultFormValues: FormInputs = {
  name: 'businesseaeou',
  address: 'aoeusnthaoeusn',
  description: 'aoeusntahoeusnhaoeu',
  city: 'Kathmandu',
  workingDays: [
    {
      day: 'Sunday',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
    },
    {
      day: 'Monday',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
    },
    {
      day: 'Tuesday',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
    },
    {
      day: 'Wednesday',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
    },
    {
      day: 'Thursday',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
    },
    {
      day: 'Friday',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
    },
    {
      day: 'Saturday',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
    },
  ],
  contactNumber: '9803939558',
  email: 'prajwalad101@gmail.com',
  coordinates: [100, 100],
  directions: [{ value: 'direction1' }],
  category: 'category1',
  subcategory: 'aeounthaeu',
  features: ['aeunthaeuoc'],
  socials: [{ value: 'aeonu' }],
  images: null,
};

export const formContent = [
  {
    id: 1,
    name: 'general information',
    description: 'First, we need to know a little bit about your business',
  },
  {
    id: 2,
    name: 'location and contact',
    description: 'Make your business easily accessible to customers',
  },
  {
    id: 3,
    name: 'category and attributes',
    description:
      'Uniquely identify your business category and all features it provides',
  },
  {
    id: 4,
    name: 'socials and uploads',
    description: 'Provide your business socials and upload images and files',
  },
];
