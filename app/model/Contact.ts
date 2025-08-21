import mongoose from 'mongoose';

interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactSchema = new mongoose.Schema<IContact>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    subject: {
      type: String,
      trim: true,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', contactSchema);
export default Contact;
