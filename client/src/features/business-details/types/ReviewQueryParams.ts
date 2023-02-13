import { IReview } from '@destiny/common/types';
import { SortBy } from 'src/types/queryParams';

export interface ReviewQueryParams {
  filters?: {
    match?: Partial<IReview>;
    in?: { [P in keyof IReview]?: IReview[P][] };
    gt?: Partial<IReview>;
    lt?: Partial<IReview>;
    lte?: Partial<IReview>;
    gte?: Partial<IReview>;
  };
  sort?: SortBy<IReview>;
}
