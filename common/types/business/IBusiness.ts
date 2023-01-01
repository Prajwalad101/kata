import { BusinessFeature, IReview } from '@destiny/common/types';

export interface IBusiness {
  _id: string;
  name: string;
  description: string;
  price: 'cheap' | 'medium' | 'high' | 'exclusive';
  createdAt?: Date;
  businessHours: { open: string; close: string };
  location: { type: 'Point'; coordinates: number[]; address?: string };
  category: string;
  subCategory: string;
  features: BusinessFeature[];
  images: string[];
  reviews?: IReview[];
  total_rating: number;
  rating_count: number;
  avgRating: number;
}
