import { IReview } from '@destiny/common/types';

export interface IBusiness {
  _id: string;
  name: string;
  description: string;
  city: string;
  workingDays: { day: string; startTime: string; endTime: string };
  contactNumber: string;
  email: string;
  directions: string[];
  category: string;
  subcategory: string;
  createdAt?: Date;
  location: { type: 'Point'; coordinates: number[]; address?: string };
  features: string[];
  socials: string[];
  images: string[];
  reviews?: IReview[];
  verified: boolean;
  total_rating: number;
  rating_count: number;
  avgRating: number;
}
