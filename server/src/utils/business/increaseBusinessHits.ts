import BusinessHits from '../../models/businessHits';

export const increaseBusinessHits = async (
  businessId: string,
  type: string
) => {
  await BusinessHits.create({
    type,
    metadata: {
      businessId,
    },
  });
};
