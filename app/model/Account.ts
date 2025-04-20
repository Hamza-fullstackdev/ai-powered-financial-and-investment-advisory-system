import mongoose, { Schema, Document } from 'mongoose';

interface IAccount extends Document {
  totalBalance: number;
  amountInvested: number;
  monthlyIncome: number;
  accountType: string;
  monthlyBudget: number;
  userId: mongoose.Schema.Types.ObjectId;
  cardDetails: {
    cardNumber: string;
    holderName: string;
    cardCvc: number;
  }[];
}
const accountSchema = new Schema<IAccount>(
  {
    totalBalance: {
      type: Number,
      trim: true,
      required: true,
    },
    amountInvested: {
      type: Number,
      trim: true,
      required: true,
    },
    monthlyIncome: {
      type: Number,
      trim: true,
      required: true,
    },
    accountType: {
      type: String,
      trim: true,
      required: true,
    },
    monthlyBudget: {
      type: Number,
      trim: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cardDetails: [
      {
        cardNumber: {
          type: String,
          trim: true,
          required: true,
        },
        holderName: {
          type: String,
          trim: true,
          required: true,
        },
        cardCvc: {
          type: Number,
          trim: true,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Account = mongoose.models.Account || mongoose.model<IAccount>('Account', accountSchema);
export default Account;
