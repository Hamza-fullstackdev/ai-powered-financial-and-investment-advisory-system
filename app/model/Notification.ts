import mongoose, { Schema, Document } from 'mongoose';

interface Notification extends Document {
  type: string;
  title: string;
  message: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const notificationsScheama = new Schema<Notification>(
  {
    type: {
      type: String,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    message: {
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

const Notification =
  mongoose.models.Notification ||
  mongoose.model<Notification>('Notification', notificationsScheama);
export default Notification;
