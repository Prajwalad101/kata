import BusinessHits from '../../models/businessHits';
import Interaction from '../../models/interactionsModel';
import { suspendUser } from '../user/suspendUser';

type Action = 'createReview' | 'askQuestion' | 'replyReview';

type Props = {
  businessId: string;
  action: Action;
  rating?: number; // if action is review
  userId?: string; // if the user is logged in
};

const MAX_INTERACTIONS = 5;
const SPAM_INTERACTIONS = 20;

export const increaseBusinessHits = async ({
  businessId,
  action,
  rating,
  userId,
}: Props) => {
  const hitScores: Record<Action, number> = {
    createReview: rating || 2, // hitscore depends on review
    replyReview: 2,
    askQuestion: 2,
  };

  // if user is logged in, update interactions collection
  try {
    if (userId) {
      // check if the interaction between user and business exists
      const interaction = await Interaction.findOne({
        user: userId,
        business: businessId,
      });

      // if found, increase count by 1
      if (interaction) {
        await Interaction.findByIdAndUpdate(interaction._id, {
          count: interaction.count + 1,
        });

        // if count is greater than 20, suspend user
        if (interaction.count >= SPAM_INTERACTIONS) {
          await suspendUser(userId);
        }

        // if  count is greater than MAX_INTERACTIONS , don't update hitscore
        if (interaction.count > MAX_INTERACTIONS) {
          return;
        }
      } else {
        // else create new interaction
        await Interaction.create({ user: userId, business: businessId });
      }

      await BusinessHits.create({
        hitScore: hitScores[action],
        metadata: {
          businessId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(
        'Something went wrong. Stack trace: increaseBusinessHits'
      );
    }
  }
};
