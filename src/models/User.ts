import mongoose, { Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

type TRole =
  // root user
  | "showaUser"
  // showa user
  | "showaAdmin"
  | "showaSubAdmin"
  //service provider user
  | "serviceProviderAdmin"
  | "serviceProviderSubAdmin"
  | "serviceProviderEngineer"
  | "serviceProviderBranchManager"
  | "serviceProviderSupportStuff";

export interface IUser extends Document {
  uid: string;
  email: string;
  role: TRole;
  status: "in-progress" | "approved" | "suspended";
  name: { firstName: string; lastName: string };
  phone: string;
  occupation?: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "prefer-not-answer";
  photoUrl?: string;
  addresses?: {
    isDeleted: boolean;
    address: {
      street: string;
      city: string;
      prefecture: string;
      postalCode: string;
      country: string;
      buildingName: string;
      roomNumber: string;
      state?: string;
      details?: string;
    };
  }[];
}
const userSchema = new Schema<IUser>(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    status: {
      type: String,
      enum: ["in-progress", "approved", "suspended"],
      required: true,
    },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    phone: { type: String, required: true, unique: true },
    occupation: { type: String },
    dateOfBirth: { type: Date, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "prefer-not-answer"],
      required: true,
    },
    photoUrl: { type: String },
    addresses: [
      {
        isDeleted: { type: Boolean, default: false },
        address: {
          street: { type: String },
          city: { type: String },
          prefecture: { type: String },
          postalCode: { type: String },
          country: { type: String },
          buildingName: { type: String },
          roomNumber: { type: String },
          state: { type: String },
          details: { type: String },
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.plugin(mongooseUniqueValidator);

export default mongoose.model<IUser>("User", userSchema);
