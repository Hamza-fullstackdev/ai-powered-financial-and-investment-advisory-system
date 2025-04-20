import mongoose, { Schema, Document } from 'mongoose';

interface ICard extends Document {
  cardNumber: string;
  cardHolder: string;
  cardCvc: string;
  userId: mongoose.Schema.Types.ObjectId;
}
const accountSchema = new Schema<ICard>(
  {
    cardNumber: {
      type: String,
      trim: true,
      required: true,
    },
    cardHolder: {
      type: String,
      trim: true,
      required: true,
    },
    cardCvc: {
      type: String,
      trim: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Card = mongoose.models.Card || mongoose.model<ICard>('Card', accountSchema);
export default Card;
