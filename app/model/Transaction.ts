import mongoose from 'mongoose';

type ITransaction = {
  amount: number;
  merchantName: string;
  date: Date;
  category: string;
  description: string;
  userId: mongoose.Schema.Types.ObjectId;
};

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    amount: {
      type: Number,
      trim: true,
      required: true,
    },
    merchantName: {
      type: String,
      trim: true,
      required: true,
    },
    date: {
      type: Date,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
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

const Transaction =
  mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', transactionSchema);
export default Transaction;
