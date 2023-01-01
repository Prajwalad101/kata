import { ValueOf } from '@destiny/common/types';

const businessFeatures = {
  delivery: 'delivery',
  reservations: 'reservations',
  events: 'events',
  goodForKids: 'good for kids',
  liveMusic: 'live music',
  outdoorDining: 'outdoor dining',
} as const;

export type BusinessFeature = ValueOf<typeof businessFeatures>;
export { businessFeatures };
