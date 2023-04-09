import { IReview } from "@destiny/common/types";

export interface IBusiness {
  _id: string;
  name: string;
  description: string;
  city: string;
  workingDays: { day: string; startTime: string; endTime: string }[];
  contactNumber: string;
  email: string;
  directions: string[];
  category: string;
  subcategory: string;
  createdAt?: Date;
  location: { type: "Point"; coordinates: [number, number]; address?: string };
  features: string[];
  socials: string[];
  website: string;
  images: string[];
  reviews?: IReview[];
  verified: boolean;
  ratings: [number, number, number, number, number];
  totalRating: number;
  avgRating: number;
  ratingCount: number;
}
