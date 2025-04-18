import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  fname: string;
  lname: string;
  email: string;
  password: string;
  profileImg?: string;
}

const userSchema = new Schema<IUser>(
  {
    fname: {
      type: String,
      trim: true,
      minlength: 3,
    },
    lname: {
      type: String,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    profileImg: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-978409_960_720.png',
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
