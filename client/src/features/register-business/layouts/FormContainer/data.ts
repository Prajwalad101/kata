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
  contactNumber: '';
  email: '';
  coordinates: [number, number] | null;
  directions: { value: string }[];
  category: string;
  subcategory: string;
  features: string[] | null;
  socials: { value: string }[];
  images: File[] | null;
};

export const defaultFormValues: FormInputs = {
  name: '',
  address: '',
  description: '',
  city: '',
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
  contactNumber: '',
  email: '',
  coordinates: null,
  directions: [{ value: '' }],
  category: '',
  subcategory: '',
  features: null,
  socials: [{ value: '' }],
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
