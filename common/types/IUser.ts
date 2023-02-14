export interface IUser {
  _id: string;
  userName: string;
  provider: string;
  email: string;
  picture: string;
  providerId: string;
  trustPoints: number;
  reviews: string[];
}
