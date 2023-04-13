import BusinessHits from '../../models/businessHits';

export const increaseBusinessHits = async ({
  businessId,
  hitScore,
}: {
  businessId: string;
  hitScore: number;
}) => {
  await BusinessHits.create({
    hitScore,
    metadata: {
      businessId,
    },
  });
};
