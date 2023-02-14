import { IReview } from '@destiny/common/types';
import { SortBy } from 'src/types/queryParams/SortBy';

export interface IReviewSortOption {
  readonly id: number;
  readonly name: string;
  readonly field: SortBy<IReview>;
}

const reviewSortOptions: IReviewSortOption[] = [
  { id: 1, name: 'most helpful', field: 'likes' },
  { id: 2, name: 'newest', field: '-createdAt' },
  { id: 3, name: 'oldest', field: 'createdAt' },
  { id: 4, name: 'highest ratings', field: '-rating' },
  { id: 5, name: 'lowest ratings', field: 'rating' },
];

export default reviewSortOptions;
