import mongoose from 'mongoose';

type Conservation = {
  userId: mongoose.Schema.Types.ObjectId;
  conservation: {
    prompt: string;
    response: string;
  }[];
};
const conservationSchema = new mongoose.Schema<Conservation>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  conservation: [
    {
      prompt: {
        type: String,
        required: true,
      },
      response: {
        type: String,
        required: true,
      },
    },
  ],
});

const Conservation =
  mongoose.models.Conservation || mongoose.model('Conservation', conservationSchema);
export default Conservation;
