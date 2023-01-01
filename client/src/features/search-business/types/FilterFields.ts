import { IBusiness } from '@destiny/common/types';

export type FilterFields = Pick<
  IBusiness,
  'features' | 'price' | 'subCategory'
>;
